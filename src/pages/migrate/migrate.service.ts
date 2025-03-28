import { Debt, DocAttach, LawAct, LawExec, Portfolio } from '@contact/models';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import DO_Types from 'src/modules/database/sqlite/sqlite.models/do_types.model';
import { MigrateInput } from './migrate.input';
import { Op } from 'sequelize';
import { node } from 'src/main';
import SmbService from 'src/modules/smb/smb.service';
import FTPService from 'src/modules/ftp/ftp.service';
import { Readable } from 'stream';

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
      const folder_name = `Цессия ${portfolio.name} Тип ${do_type_name} от ${date} (${files_length} шт)`;

      // Подключаемся к FTP и создаем директорию
      await this.ftp_service.connect();
      await this.ftp_service.mkDir({
        path: folder_name,
      });

      for (const { doc_attachs, debt_id } of debts_obj) {
        const files = doc_attachs;
        let fileCount = 0; // Счетчик файлов для текущего debt_id

        for (const { REL_SERVER_PATH, FILE_SERVER_NAME } of files) {
          try {
            const path = `${REL_SERVER_PATH.replace(/\\/g, '\\\\')}${FILE_SERVER_NAME}`;
            await new Promise((resolve) => setTimeout(resolve, 10)); // <-- timeout

            // Проверяем существование файла
            const exists = await this.smb_service.exists(path);

            if (!exists) {
              results.push({ path, status: 'not_found' });
              continue;
            }

            // Если файл существует и нужно загрузить
            if (upload) {
              try {
                const { data } = await this.smb_service.readFileBuffer(path);
                fileCount++; // Увеличиваем счетчик

                // Получаем расширение файла из оригинального имени
                const fileExtension = FILE_SERVER_NAME.split('.').pop() || '';
                // Формируем имя файла в формате debt_id_(count).extension
                const ftpFileName = `${debt_id}_(${fileCount}).${fileExtension}`;

                console.log('Uploading to FTP:', ftpFileName);
                await this.ftp_service.uploadFileBuffer(data, ftpFileName);
                results.push({ path, exists, status: 'uploaded', ftpFileName });
                console.log('Successfully uploaded:', ftpFileName);
              } catch (error) {
                console.error(
                  `Error uploading file ${FILE_SERVER_NAME}:`.red,
                  error.message,
                );
                results.push({
                  path: `${REL_SERVER_PATH}${FILE_SERVER_NAME}`,
                  error: error.message,
                  status: 'upload_failed',
                });
                continue;
              }
            } else {
              results.push({ path, exists, status: 'checked' });
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
        checked_result: `${checked} // ${files_length}`,
        results,
        doc_attachs_objs,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
