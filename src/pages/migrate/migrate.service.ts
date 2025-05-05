import { Debt, DocAttach, LawAct, LawExec, Portfolio } from '@contact/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import DO_Types from 'src/modules/database/sqlite/sqlite.models/do-types.model';
import { MigrateInput } from './migrate.input';
import { Op } from 'sequelize';
import { node } from 'src/main';
import SmbService from 'src/modules/smb/smb.service';
import FTPService from 'src/modules/ftp/ftp.service';
import { Readable } from 'stream';
import Uploaded from 'src/modules/database/sqlite/sqlite.models/uploaded.model';

@Injectable()
export default class MigrateService {
  constructor(
    @InjectModel(Portfolio, 'contact')
    private readonly modelPortfolio: typeof Portfolio,
    @InjectModel(Debt, 'contact')
    private readonly modelDebt: typeof Debt,
    @InjectModel(DocAttach, 'contact')
    private readonly modelDocAttach: typeof DocAttach,
    @InjectModel(DO_Types, 'sqlite')
    private readonly modelDoTypes: typeof DO_Types,
    @InjectModel(Uploaded, 'sqlite')
    private readonly modelUploaded: typeof Uploaded,
    private readonly smb_service: SmbService,
    private readonly ftp_service: FTPService,
  ) {}

  today(date = new Date()) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  async migrate({
    r_portfolio_id,
    do_type_name,
    include_type,
    upload,
  }: MigrateInput) {
    console.log(
      'r_portfolio_id:',
      r_portfolio_id,
      '\n',
      'do_type_name:',
      do_type_name,
      '\n',
      'include_type:',
      include_type,
      '\n',
    );
    try {
      const obj = {
        1: {
          name: 'LawActs',
          model: LawAct,
        },
        2: {
          name: 'LawExecs',
          model: LawExec,
        },
      };
      const model_to_search = obj[include_type];

      const portfolio = await this.modelPortfolio.findOne({
        logging: node === 'dev' ? console.log : false,
        attributes: ['id', 'name'],
        rejectOnEmpty: new Error(`Портфель с id:"${r_portfolio_id}" не найден`),
        where: {
          id: r_portfolio_id,
        },
      });
      const uploaded_files = await this.modelUploaded.findAll({
        where: {
          is_uploaded: true,
        },
        attributes: ['id'],
      });
      const uploaded_files_ids = uploaded_files.map((item) => item.id);
      const debts = await this.modelDebt.findAll({
        where: {
          r_portfolio_id,
        },
        include: [
          {
            attributes: ['id'],
            model: model_to_search.model,
            required: true,
            include: [
              {
                model: DocAttach,
                required: true,
                attributes: [
                  'id',
                  'obj_id',
                  'r_id',
                  'name',
                  'filename',
                  'FILE_SERVER_NAME',
                  'REL_SERVER_PATH',
                ],
                where: {
                  name: {
                    [Op.like]: `${do_type_name}%`,
                  },
                  id: {
                    [Op.notIn]: uploaded_files_ids,
                  },
                },
              },
            ],
          },
        ],
      });
      const debts_obj = debts.map((item) => {
        const lawItems = item[model_to_search.name];

        const docAttachs = lawItems.flatMap(
          (lawItem) =>
            lawItem.DocAttachs?.map((doc) => ({
              id: doc.id,
              obj_id: doc.obj_id,
              r_id: doc.r_id,
              name: doc.name,
              filename: doc.filename,
              FILE_SERVER_NAME: doc.FILE_SERVER_NAME,
              REL_SERVER_PATH: doc.REL_SERVER_PATH,
            })) || [],
        );

        return {
          debt_id: item.id as number,
          doc_attachs: docAttachs,
        };
      });

      // Находим долг с максимальным количеством вложенных документов
      const max_doc_debt = debts_obj.reduce((max, current) => {
        return current.doc_attachs.length > max.doc_attachs.length
          ? current
          : max;
      });
      const folder_count = max_doc_debt.doc_attachs.length;
      console.log('Долг с максимальным количеством документов:', {
        debt_id: max_doc_debt.debt_id,
        doc_count: max_doc_debt.doc_attachs.length,
      });

      const results = [] as any[];
      const doc_attachs_objs = debts_obj.map((item) =>
        item.doc_attachs.map((item) => ({
          id: item.id,
          FILE_SERVER_NAME: item.FILE_SERVER_NAME,
          REL_SERVER_PATH: item.REL_SERVER_PATH,
          path: `${item.REL_SERVER_PATH.replace(/\\/g, '\\\\') + item.FILE_SERVER_NAME}`,
        })),
      );
      let checked: number = 0;
      const files_length = doc_attachs_objs.flat().length;
      const date = this.today();
      const base_folder_name = `Цессия ${portfolio.name} Тип ${do_type_name} от ${date}`;
      if (upload) {
        // Подключаемся к FTP и создаем директорию
        await this.ftp_service.connect();
        for (let index = 0; index < folder_count; index++) {
          await this.ftp_service.mkDir({
            path: `${base_folder_name}_(${index + 1})`,
          });
        }
        this.ftp_service.setCurrentDir('/');
      }
      for (const { doc_attachs, debt_id } of debts_obj) {
        const files = doc_attachs;
        let fileCount = 0; // Счетчик файлов для текущего debt_id

        for (const {
          REL_SERVER_PATH,
          FILE_SERVER_NAME,
          doc_attach_id,
        } of files) {
          try {
            const path = `${REL_SERVER_PATH.replace(/\\/g, '\\\\')}${FILE_SERVER_NAME}`;
            console.log('Processing file:', {
              path,
              currentCount: checked + 1,
              totalFiles: files_length,
            });

            try {
              // Создаем промис с таймаутом для проверки файла
              const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => {
                  reject(new Error('File check timeout'));
                }, 3000); // 3 секунды таймаут
              });

              // Создаем промис для проверки файла
              const checkPromise = this.smb_service.exists(path);

              // Ждем либо результата проверки, либо таймаута
              const exists = await Promise.race([checkPromise, timeoutPromise]);
              console.log('File exists check result:', { path, exists });

              if (!exists) {
                await this.modelUploaded.create({
                  r_docattach_id: doc_attach_id,
                  file_name: FILE_SERVER_NAME,
                  file_path: path,
                  is_uploaded: false,
                  description:
                    'Файл не найден и не был загружен. Возможно он не сущесвует',
                });
                results.push({ path, status: 'not_found' });
                checked++;
                continue;
              }
              // Создаём запись в таблице uploaded
              const uploaded_file = this.modelUploaded.build({
                r_docattach_id: doc_attach_id,
                file_name: FILE_SERVER_NAME,
                file_path: path,
                is_uploaded: false,
                description: 'Файл существует и может быть загружен',
              });
              // Если файл существует и нужно загрузить
              if (upload) {
                try {
                  console.log('Reading file buffer:', path);
                  const { data } = await this.smb_service.readFileBuffer(path);
                  console.log('File buffer read successfully:', path);
                  fileCount++; // Увеличиваем счетчик

                  // Получаем расширение файла из оригинального имени
                  const fileExtension = FILE_SERVER_NAME.split('.').pop() || '';
                  // Формируем имя файла в формате debt_id.extension
                  const ftpFileName = `${debt_id}.${fileExtension}`;

                  const uploaded_folder = this.ftp_service.fixPath(
                    `${base_folder_name}_(${fileCount})`,
                  );

                  const full_path = `${uploaded_folder}/${ftpFileName}`;
                  console.log('Starting FTP upload:', {
                    sourcePath: path,
                    ftpPath: full_path,
                  });
                  await this.ftp_service.uploadFileBuffer(data, full_path);
                  results.push({ path, exists, status: 'uploaded', full_path });
                  // Обновляем запись в таблице uploaded
                  uploaded_file.is_uploaded = true;
                  uploaded_file.description = 'Файл успешно загружен';
                  await uploaded_file.save();
                  console.log('Successfully uploaded:', full_path);
                } catch (error) {
                  console.error(
                    `Error uploading file ${FILE_SERVER_NAME}:`.red,
                    error.message,
                  );
                  uploaded_file.is_uploaded = false;
                  uploaded_file.description = `При загрузке файла произошла ошибка: ${error.message}`;
                  await uploaded_file.save();
                  results.push({
                    path: `${REL_SERVER_PATH}${FILE_SERVER_NAME}`,
                    error: error.message,
                    status: 'upload_failed',
                  });
                  continue;
                }
              } else {
                results.push({ path, exists, status: 'checked' });
                uploaded_file.is_uploaded = true;
                await uploaded_file.save();
              }
            } catch (error) {
              if (error.message === 'File check timeout') {
                console.warn(
                  `Timeout while checking file ${path}, skipping...`,
                );
                results.push({ path, status: 'check_timeout' });
              } else {
                console.error(
                  `Error checking file ${FILE_SERVER_NAME}:`.red,
                  error.message,
                );
                results.push({
                  path: `${REL_SERVER_PATH}${FILE_SERVER_NAME}`,
                  error: error.message,
                  status: 'check_failed',
                });
              }
            }

            checked++;
            console.log(checked, '/', files_length);
          } catch (error) {
            console.error(
              `Error checking file ${FILE_SERVER_NAME}:`.red,
              error.message,
            );
            results.push({
              path: `${REL_SERVER_PATH}${FILE_SERVER_NAME}`,
              error: error.message,
              status: 'check_failed',
            });
          }
        }
      }

      // Закрываем соединения после завершения всех операций
      await this.ftp_service.close();
      await this.smb_service.disconnect();

      return {
        name: portfolio.name,
        type: do_type_name,
        model_to_search: model_to_search.name,
        debts_count: debts.length,
        folder_count,
        checked_result: `${checked} // ${files_length}`,
        results,
        doc_attachs_objs,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
