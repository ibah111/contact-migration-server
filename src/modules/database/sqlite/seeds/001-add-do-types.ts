import { QueryInterface } from 'sequelize';
import { MigrationFn } from 'umzug';

export const up: MigrationFn<QueryInterface> = ({ context }) =>
  context.sequelize.transaction((t) =>
    context.sequelize.models.DO_Types.bulkCreate(
      [
        { name: 'Запрос из суда пересчет' },
        { name: 'Запрос из суда ИСК' },
        { name: 'Запрос из суда ПРАВОПРЕЕМСТВО' },
        {
          name: 'Запрос из госорганов (кроме суда) МВД/Прокуратура/Роскомнадзор и т.д.',
        },
        { name: 'Исковое заявление, где мы являемся ответчиком' },
        {
          name: 'Определение об отказе в восстановлении пропущенного срока для подачи ЧЖ',
        },
        {
          name: 'Решение об обращении взыскания на земельный участок по заявлению СПИ',
        },
        { name: 'Определение о выдаче дубликата ИД' },
        { name: 'Определение об отказе в выдаче дубликата ИД' },
        { name: 'Решение (решение об удовлетворении исковых требований)' },
        {
          name: 'Определение об оставлении без рассмотрения заявления о замене/Определение об оставлении без рассмотрения заявления о замене и выдаче дубликата',
        },
        {
          name: 'Определение об отказе в принятии заявдения о замене/Определение об отказе в принятии заявления о замене и выдаче дубликата',
        },
        { name: 'Определение о возврате нашей ЧЖ ПРАВОПРЕЕМСТВО' },
        { name: 'Возврат нашей ЧЖ ПРАВОПРЕЕМСТВО' },
        { name: 'Определение об отказе в принятии нашей ЧЖ ПРАВОПРЕЕМСТВО' },
        { name: 'Судебная повестка с запросом ДУБЛИКАТ' },
        { name: 'Судебная повестка с запросом где мы третье лицо' },
        {
          name: 'Судебная повестка где мы ответчик (должник_СПИ_другое лицо подает иск на нас)_судебная повестка по возражению должника на наше заявление _судебная плвеська по чьему-то еще возражению_ отзыву_ заявлению в ответ на наше заявление',
        },
        {
          name: 'Определение об отказе в замене_Определение об отказе в замене и об отказе в выдаче дубликата ИД',
        },
        {
          name: 'Предложение взыскателю оставить нереализованное имущество за собой',
        },
        { name: 'Заявление о взыскании с нашей организации ДС (от должника)' },
        {
          name: 'Определение о взыскании с нашей организации ДС (Определение о взыскании с НБК_ЮСБ_Вымпел ДС в пользу должника)',
        },
        {
          name: 'Решение о взыскании с нашей организации ДС (Решение о взыскании с НБК_ЮСБ_Вымпел ДС в пользу должника)',
        },
        { name: 'Заявление должника о повороте исполнения судебного решения' },
        {
          name: 'Определение о повороте исполнения решения суда_судебного приказа',
        },
        { name: 'ПОВИП на НБК_ЮСБ_Вымпел' },
        { name: 'Апелляционное_Кассационное определение' },
        { name: 'Апелляционное_Кассационное определение по иску' },
        { name: 'ЧЖ где мы ответчик' },
        { name: 'АЖ где мы ответчик' },
        { name: 'КЖ где мы ответчик' },
        {
          name: 'Уведомление_извещение о назначении сз по КЖ должника_сопровод.письмо с указанием срока для принесения возражений на КЖ (где мы ответчик по КЖ)',
        },
        {
          name: 'Уведомление_извещение о назначении сз по АЖ должника_сопровод.письмо с указанием срока для принесения возражений на АЖ (где мы ответчик по АЖ)',
        },
        {
          name: 'Уведомление_извещение о назначении сз по ЧЖ должника_сопровод.письмо с указанием срока для принесения возражений на ЧЖ (где мы ответчик по ЧЖ)',
        },
        { name: 'Постановление об отказе в возбуждении уголовного дела' },
        { name: 'Исковое заявление где мы отвтечик' },
        { name: 'Определение об отмене СП ПРИКАЗ' },
        { name: 'Определение об отмене СП ПЕРЕСЧЕТ' },
        { name: 'Требование ОСП о возврате ДС' },
        {
          name: 'Определение об оставлении без движения заявления об отмене наложения ареста',
        },
        {
          name: 'Определение об оставлении без движения искового заявления_Акт об отсутствии вложений из суда',
        },
        {
          name: 'Определение об оставлении без движения хаявления о замене_Определение об оставлении без движения заявления о замене и выдаче дубликата_Акт об отсутствии вложений из суда',
        },
        {
          name: 'Определение об оставлении без движения заявления о выдаче дубликата ИД_Акт об отсутствии вложений из суда',
        },
        {
          name: 'Определение об оставлении без движения заявления_Акт об отсутствии вложений из суда (ИСК_ПЕРЕСЧЕТ)',
        },
        {
          name: 'Определение об оставлении без движения ЧЖ_Акт об отсутствии вложений из суда ДУБЛИКАТ',
        },
        {
          name: 'Определение об оставлении без движения Чж_Акт об отсутствии вложений из суда ПРИКАЗ',
        },
        {
          name: 'Определение об оставлении без движения ЧЖ_Акт об отсутствии вложений из суда ИСК',
        },
        {
          name: 'Определение об оставлении без движения ЧЖ_Акт об отсутствии вложений из суда ПЕРЕСЧЕТ',
        },
        {
          name: 'Определение об оставлении без движения АЖ_КЖ_Акт об отсутствии вложений из суда',
        },
        { name: 'Решении о частичном удовлетворении исковых требований' },
        { name: 'Решение об отказе в удовлетворении исковых требований' },
        {
          name: 'Решение об отказе в удовлетворении исковых требований И О ВЗЫСКАНИИ С НАС ДС',
        },
        { name: 'Определение об исправлении описки' },
        {
          name: 'Определение о восстановлении пропущенного срока для предъявления ИД ПРАВОПРЕЕМСТВО',
        },
        {
          name: 'Определение о восстановлении пропущенного срока для предъявления ИД ДУБЛИКАТ',
        },
        { name: 'Определение о замене и об отказе в выдаче дубликата ИД' },
        {
          name: 'Определение о замене_Определение о замене на стороне должника (ИП не возбуждено_нет информации_ИД нет)',
        },
        { name: 'Определение о замене (ИП окончено п.7 ст.47)' },
        {
          name: 'Опрежедение о замене_Определение о замене на стороне должника (ИП окончено п1_п2 ст47)',
        },
        {
          name: 'Определение о замене_Определение о замене на стороне должника (ИП не возбуждено_ИД у нас)',
        },
        {
          name: 'Определение о замене на стороне должника ПРИКАЗ (ИП возбуждено)',
        },
        { name: 'Определение о замене на стороне должника ПРИКАЗ (ИД у нас)' },
        {
          name: 'Определение о замене на стороне должника ИСК (ИП возбуждено)',
        },
        { name: 'Определение о замене на стороне должника ИСК (ИД у нас)' },
        { name: 'Определение о замене по заявлению СПИ' },
        { name: 'Определение о замене и выдаче дубликата ИД' },
        {
          name: 'Определение об отмене заочного решения ПРАВОПРЕЕМСТВО (отменено решение в пользу банка)',
        },
        { name: 'Определение об отмене заочного решения ИСК' },
        { name: 'Определение об отмене заочного решения ПЕРЕСЧЕТ' },
        {
          name: 'ИЛ_ СП_ Дубликат ИЛ_ Дубликат СП из суда в пользу банка_арест_гп_суд.расходы_исполнительная надпись нотариуса',
        },
        { name: 'СП в нашу пользу (новые из суда)' },
        { name: 'ИЛ по решению в нашу пользу(новые из суда)' },
        { name: 'Дубликат ИЛ в нашу пользу из суда' },
        { name: 'Дубликат СП в нашу пользу из суда' },
        {
          name: 'ИЛ_ СП_ Дубликат ИЛ_ Дубликат СП_ исполнительная надпись нотариуса в нашу пользу с ПОИП и АКТ',
        },
        { name: 'Оригинал ИД(любой) НЕ НАШ(ошибочно поступил нам)' },
        { name: 'Возврат конверта_ адресованного должнику' },
        {
          name: 'Определение о возврате заявления о восстановлении пропущенного срока для предъявления ИД',
        },
        {
          name: 'Возврат заявления о восстановлении пропущенного срока для предъявления ИД',
        },
        {
          name: 'Определение о возврате заявления о приостановлении ИП (по нашему заявлению)',
        },
        {
          name: 'Определение о возврате заявления о составлении мотивированного решения',
        },
        { name: 'Возврат ходатайства ПЕРЕСЧЕТ' },
        { name: 'Возврат ходатайства ИСК' },
        { name: 'Возврат ходатайства ПРИКАЗ' },
        { name: 'Возврат ходатайства ПРАВОПРЕЕМСТВО' },
        { name: 'Возврат ходатайства ДУБЛИКАТ' },
        {
          name: 'Определение о возврате заявления о замене_Возврат заявления о замене_Определение о возврате заявления о замене и выдаче дубликата_Возврат заявления о замене и выдаче дубликата',
        },
        { name: 'Определение о возврате заявления о выдаче дубликата ИД' },
        { name: 'Возврат заявления о выдаче дубликата ИД' },
        { name: 'Определение о возврате заявления о возврате ГП' },
        { name: 'Возврат заявления о возврате ГП' },
        {
          name: 'Определение об оставлении без рассмотрения заявления о возврате ГП',
        },
        { name: 'Определение об отказе в принятии заявления о возврате ГП' },
        { name: 'Определение о возврате нашей ЧЖ ДУБЛИКАТ' },
        { name: 'Возврат нашей ЧЖ ДУБЛИКАТ' },
        { name: 'Определение о возврате нашей ЧЖ ИСК' },
        { name: 'Возврат нашей ЧЖ ИСК' },
        { name: 'Определение о возврате нашей ЧЖ ПРИКАЗ' },
        { name: 'Возврат нашей ЧЖ ПРИКАЗ' },
        { name: 'Определение о возврате нашей ЧЖ ПЕРЕСЧЕТ' },
        { name: 'Возврат нашей ЧЖ ПЕРЕСЧЕТ' },
        { name: 'Определение о возврате нашей АЖ' },
        { name: 'Возврат нашей АЖ' },
        { name: 'Определение о возврате нашей КЖ' },
        { name: 'Возврат нашей КЖ' },
        {
          name: 'Определение о возврате заявления о вынесении СП_Возврат заявления о вынесении СП (ПРИКАЗ)',
        },
        {
          name: 'Определение о возврате заявления о вынесении СП_Возврат заявления о вынесении СП (ПЕРЕСЧЕТ)',
        },
        {
          name: 'Определение о возврате искового заявления_Возврат искового заявления (ИСК)',
        },
        {
          name: 'Определение о возврате искового заявления_Возврат искового заявления (ПЕРЕСЧЕТ)',
        },
        { name: 'Ответы из судов' },
        { name: 'Документы из арбитражного суда' },
        { name: 'Повестки' },
      ],
      { transaction: t },
    ),
  );
