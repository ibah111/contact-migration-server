fetch("https://crm.nbkfinance.ru/api/log/login", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "ru,en;q=0.9,en-US;q=0.8",
    "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvY3JtLm5ia2ZpbmFuY2UucnVcL2FwaVwvbG9nXC9sb2dpbiIsImlhdCI6MTc0NTMwODE3MywiZXhwIjoxNzQ1MzQ0MTczLCJuYmYiOjE3NDUzMDgxNzMsImp0aSI6IjZWamdDZExLTlZIdlJWY2QiLCJzdWIiOjUwLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0._VNyA_3dE1P2l_yJr6SKEbJprmN97sWsH21EioulwyY",
    "cache-control": "no-cache",
    "content-type": "application/json;charset=UTF-8",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Microsoft Edge\";v=\"135\", \"Not-A.Brand\";v=\"8\", \"Chromium\";v=\"135\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-xsrf-token": "eyJpdiI6InZpQmppTVVOdi9HR1AwTXlmU2NNU3c9PSIsInZhbHVlIjoiYzBsTkJYR1FpbEdPb2drU09SaUFPOGh5c3JuR3pZUURuQTNULzkvMVZESmgxSVZGTDRUdzZ1eklhTDcyajU3SWszcG0wNGN3LzhXWmo4YlBZYTE1RzBlMkdaRGgrWEtVd1QyWDUzYjVWWm5uaFJHY2p5d0pJSzhXdXVaODYxVW8iLCJtYWMiOiI1Zjc4NjVhODczMGEwZGZmZTNkYmZmMDRmNDYzOWNmOGZhNTIzYzE3ZmFiZGFmYzAyNTVmYmU0YzM1ODU3YmQ4In0=",
    "cookie": "io=r9ZYvEO3GVBw_3yiAABh; _com.auth0.auth.kg_~LiLr.j2NvsSTUm18fokVybrP8V-T_compat={%22nonce%22:%22Hebk7t41oyn-mG4YvxB2Cw0QT-2ivs5O%22%2C%22state%22:%22kg_~LiLr.j2NvsSTUm18fokVybrP8V-T%22}; com.auth0.auth.kg_~LiLr.j2NvsSTUm18fokVybrP8V-T={%22nonce%22:%22Hebk7t41oyn-mG4YvxB2Cw0QT-2ivs5O%22%2C%22state%22:%22kg_~LiLr.j2NvsSTUm18fokVybrP8V-T%22}; _com.auth0.auth.E9aTPH0aU6Nor_xyTj-fmfvsO.Cq-EVO_compat={%22nonce%22:%22bhXSw1yMRCVwJGa5zl0VB-43Xolvvni9%22%2C%22state%22:%22E9aTPH0aU6Nor_xyTj-fmfvsO.Cq-EVO%22}; com.auth0.auth.E9aTPH0aU6Nor_xyTj-fmfvsO.Cq-EVO={%22nonce%22:%22bhXSw1yMRCVwJGa5zl0VB-43Xolvvni9%22%2C%22state%22:%22E9aTPH0aU6Nor_xyTj-fmfvsO.Cq-EVO%22}; _com.auth0.auth.lOtBHHiVo4GMMAHlF9UNR3RzeL1pzlAT_compat={%22nonce%22:%22.2A89jXivo7AUhYi~DPSd-0D3EeUzDcs%22%2C%22state%22:%22lOtBHHiVo4GMMAHlF9UNR3RzeL1pzlAT%22}; com.auth0.auth.lOtBHHiVo4GMMAHlF9UNR3RzeL1pzlAT={%22nonce%22:%22.2A89jXivo7AUhYi~DPSd-0D3EeUzDcs%22%2C%22state%22:%22lOtBHHiVo4GMMAHlF9UNR3RzeL1pzlAT%22}; XSRF-TOKEN=eyJpdiI6InZpQmppTVVOdi9HR1AwTXlmU2NNU3c9PSIsInZhbHVlIjoiYzBsTkJYR1FpbEdPb2drU09SaUFPOGh5c3JuR3pZUURuQTNULzkvMVZESmgxSVZGTDRUdzZ1eklhTDcyajU3SWszcG0wNGN3LzhXWmo4YlBZYTE1RzBlMkdaRGgrWEtVd1QyWDUzYjVWWm5uaFJHY2p5d0pJSzhXdXVaODYxVW8iLCJtYWMiOiI1Zjc4NjVhODczMGEwZGZmZTNkYmZmMDRmNDYzOWNmOGZhNTIzYzE3ZmFiZGFmYzAyNTVmYmU0YzM1ODU3YmQ4In0%3D; laravel_session=eyJpdiI6IjA4NGxTRW5idkticG5ETTFvSjVzZGc9PSIsInZhbHVlIjoicXJPRGZaR3VsQ1NmRzZuVmRzbTBRdm44MVVPcFhyV1VsTzFTbFNHN25uVFVZQnhLUzZiRXNWaWpWeFMyMHVPWDJNQ05tc05ubmtqd3c0TUhkRUZkenY5ZThmTFptdGJDTjc1RFlCb0VBRzhIVldGUk9ZM1A5akVlVnNGNmN3WVgiLCJtYWMiOiI5ZjIyOWY1MjY0OWE4ODU1NDJmZjJiNDBlMDQ4MjQyYjQ2MzQ5MWYxOWEwY2FlYmNiMWExYzQ2NWMxZDY0NjE2In0%3D",
    "Referer": "https://crm.nbkfinance.ru/pages/login",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "{\"email\":\"baledin@zakon43.ru\",\"password\":\"xWkV*BJh\",\"remember_me\":true}",
  "method": "POST"
});

let responce = {
  "userData": {
    "id": 50,
    "name": "Иван",
    "email": "baledin@zakon43.ru",
    "email_verified_at": null,
    "name_family": "Балезин",
    "name_patronymic": null,
    "sex": "M",
    "phone": null,
    "local_phone": null,
    "role_id": 1,
    "avatar": null,
    "pag": {
      "bp": {
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "sud": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "status": null,
        "findResponsibleEmployeeId": null
      },
      "sogl": {
        "find": null,
        "limit": 10,
        "idType": null,
        "offset": 0,
        "curPage": 1,
        "idStatus": null
      },
      "email": {
        "find": null,
        "limit": 100,
        "fields": [],
        "offset": 0
      },
      "poles": {
        "find": null,
        "limit": 10,
        "offset": 0
      },
      "proxy": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "sudPp": {
        "find": null,
        "limit": 10,
        "filter": null,
        "offset": 0,
        "status": null
      },
      "credit": {
        "find": null,
        "limit": 10,
        "fields": [],
        "offset": 0,
        "status": null,
        "columns": [],
        "id_recover": -2,
        "selectIdCredit": "15678",
        "AdditionalFilters": {
          "fssp": -1,
          "idJud": -1,
          "region": -1,
          "typeCp": [],
          "dateFns": null,
          "dateIsk": null,
          "datePfr": null,
          "dateSud": null,
          "find_sa": "Все",
          "id_user": -1,
          "dateBank": null,
          "dateFssp": null,
          "dateEndIp": 0,
          "name_delo": [],
          "number_ip": null,
          "pensioner": [],
          "typeDebtor": [],
          "typeCp_json": "[]",
          "dateResponseSa": null,
          "name_delo_json": "[]",
          "pensioner_json": "[]",
          "typeDebtor_json": "[]"
        }
      },
      "debtor": {
        "find": null,
        "limit": 10,
        "offset": 0
      },
      "pochta": {
        "date": null,
        "find": null,
        "list": [],
        "limit": 100,
        "offset": 0,
        "status": 0
      },
      "refine": {
        "find": null,
        "limit": 10,
        "fields": [],
        "offset": 0,
        "status": null
      },
      "sudAct": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "status": null
      },
      "tokens": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "holiday": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "reports": {
        "find": null,
        "list": [],
        "limit": 10,
        "id_org": 0,
        "offset": 0,
        "status": [],
        "id_reestr": 0,
        "conditions": [
          "123"
        ],
        "id_recover": 0
      },
      "scoring": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "bankArch": {
        "date": null,
        "find": null,
        "limit": 100,
        "offset": 0,
        "status": 0,
        "bankStatus": "Все"
      },
      "judicial": {
        "find": null,
        "limit": 10,
        "offset": 0
      },
      "massCall": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "payments": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "status": 0
      },
      "reestrIp": {
        "find": null,
        "limit": 100,
        "fields": [],
        "offset": 0,
        "status": null,
        "id_recover": -2,
        "fields_prop": [],
        "offset_prop": 0,
        "AdditionalFilters": {
          "fssp": -1,
          "idJud": -1,
          "region": -1,
          "typeCp": [],
          "dateFns": null,
          "dateIsk": null,
          "datePfr": null,
          "dateSud": null,
          "id_user": -1,
          "dateBank": null,
          "dateFssp": null,
          "dateEndIp": 0,
          "name_delo": [],
          "number_ip": null,
          "pensioner": [],
          "typeDebtor": [],
          "typeCp_json": "[]",
          "dateResponseSa": null,
          "name_delo_json": "[]",
          "pensioner_json": "[]",
          "typeDebtor_json": "[]"
        }
      },
      "statHist": {
        "date": null,
        "limit": 100,
        "offset": 0
      },
      "sudOrder": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "status": 0
      },
      "taskSuds": {
        "date": null,
        "find": null,
        "limit": 10,
        "fields": [],
        "offset": 0,
        "status": 0,
        "curPage": 1
      },
      "bkiErrors": {
        "find": null,
        "idOrg": null,
        "limit": 10,
        "idUser": null,
        "offset": 0,
        "curPage": 1,
        "errType": null,
        "errorWarn": null
      },
      "civilCase": {
        "find": null,
        "limit": 100,
        "fields": [],
        "offset": 0,
        "curPage": 1
      },
      "debtorPag": 10,
      "logSystem": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "reestrPay": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "refinePag": 10,
      "staticSud": {
        "find": null,
        "limit": 100,
        "offset": 0
      },
      "sudErrors": {
        "date": null,
        "id_org": 0,
        "cession": 0,
        "id_recover": 0,
        "num_recover": 0,
        "typeRecover": 0
      },
      "taskError": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "task_user": {
        "find": null,
        "limit": 100,
        "offset": 0
      },
      "appealsLog": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "status": null,
        "curPage": 1,
        "dataEnd": null,
        "dataBegin": null,
        "id_recover": null,
        "statusName": null
      },
      "arbitrArea": {
        "find": null,
        "limit": 150,
        "offset": 0
      },
      "clientCard": {
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "fsspArchiv": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1,
        "bankFsspDate": null
      },
      "fsspOtdels": {
        "find": null,
        "limit": 100,
        "offset": 0,
        "curPage": null
      },
      "jobListLog": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "status": null,
        "curPage": 1,
        "dataEnd": null,
        "dataBegin": null,
        "operatorName": null
      },
      "paymentsSo": {
        "find": null,
        "limit": 100,
        "offset": 0,
        "status": 0
      },
      "recShabAll": {
        "id_org": 0,
        "id_recover": 0
      },
      "scoringOne": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "sudCredits": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1,
        "idCredit": null
      },
      "typesEmail": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "userForGas": {
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "workQueuen": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "bkiHandbook": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "commentsLog": {
        "find": null,
        "limit": 10,
        "fields": [],
        "offset": 0,
        "status": null,
        "curPage": 1,
        "dataEnd": null,
        "dataBegin": null
      },
      "crmFilesLog": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "development": {
        "find": null,
        "limit": 100,
        "offset": 0,
        "new_msg": false
      },
      "fsspOtdelsN": {
        "find": null,
        "limit": 100,
        "offset": 0
      },
      "fssp_refine": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "status": null
      },
      "judicialAct": {
        "find": null,
        "limit": 10,
        "offset": 0
      },
      "phoneScript": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "prokurature": {
        "find": null,
        "limit": 10,
        "offset": 0
      },
      "reminderLog": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "status": null,
        "userId": 0,
        "curPage": 1,
        "dataEnd": null,
        "dataBegin": null,
        "operatorName": null
      },
      "requestUser": {
        "request": 0,
        "UserStatus": 0,
        "paginationPageSize": 100
      },
      "userAPIList": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "userLogging": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "userId": null,
        "curPage": 1
      },
      "debtorReestr": 10,
      "fnsArhStatus": {
        "find": null,
        "limit": 100,
        "offset": 0
      },
      "judicialArea": {
        "find": null,
        "limit": 150,
        "offset": 0
      },
      "reestrDebtor": {
        "find": null,
        "limit": 10,
        "fields": [],
        "offset": 0,
        "status": null,
        "columns": [],
        "id_recover": -2,
        "AdditionalFilters": {
          "fssp": -1,
          "idJud": -1,
          "region": -1,
          "typeCp": [],
          "dateFns": null,
          "dateIsk": null,
          "datePfr": null,
          "dateSud": null,
          "find_sa": "Все",
          "id_user": -1,
          "dateBank": null,
          "dateFssp": null,
          "dateEndIp": 0,
          "name_delo": [],
          "number_ip": null,
          "pensioner": [],
          "typeDebtor": [],
          "typeCp_json": "[]",
          "dateResponseSa": null,
          "name_delo_json": "[]",
          "pensioner_json": "[]",
          "typeDebtor_json": "[]"
        }
      },
      "refineFilter": null,
      "revisionsLog": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "status": null,
        "userId": null,
        "curPage": 1,
        "dataEnd": null,
        "keyName": null,
        "dataBegin": null
      },
      "typeDocument": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "typesAddress": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "afterStatuses": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1,
        "statusId": null
      },
      "controlStatus": {
        "find": null,
        "limit": 10,
        "filter": null,
        "offset": 0,
        "status": null
      },
      "crmVersionLog": {
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "debtor_reestr": {
        "find": null,
        "limit": 10,
        "offset": 0
      },
      "failedJobsLog": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "status": null,
        "curPage": 1,
        "dateEnd": null,
        "dateBegin": null,
        "statusName": null
      },
      "jurisdictions": {
        "find": null,
        "limit": 50,
        "offset": 0
      },
      "notaryListLog": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "status": null,
        "curPage": 1,
        "last_name": null
      },
      "numberRecords": {
        "limit": 10,
        "dateTo": null,
        "offset": 0,
        "curPage": 1,
        "dateFrom": null
      },
      "printFilesLog": {
        "find": null,
        "limit": 10,
        "myType": null,
        "offset": 0,
        "status": null,
        "userId": 0,
        "curPage": 1,
        "dataEnd": null,
        "dataBegin": null
      },
      "reestr_delete": {
        "find": null,
        "limit": 10,
        "filter": null,
        "offset": 0,
        "status": null
      },
      "reestr_import": {
        "find": null,
        "limit": 10,
        "offset": 0
      },
      "scoringReestr": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "sudPpReturnGp": {
        "find": null,
        "limit": 10,
        "filter": null,
        "offset": 0,
        "status": null
      },
      "bankArchReturn": {
        "date": null,
        "find": null,
        "limit": 100,
        "offset": 0,
        "status": 0,
        "bankStatus": "Все"
      },
      "bankSberAlfaSa": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "bankrotHistory": {
        "date": null,
        "limit": 10,
        "offset": 0,
        "status": null,
        "curPage": 1
      },
      "beforeStatuses": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1,
        "statusId": null
      },
      "captchaStatics": {
        "find": null,
        "limit": 10,
        "dateTo": null,
        "fields": [],
        "offset": 0,
        "curPage": 1,
        "dateFrom": null
      },
      "correspondence": {
        "fast": true,
        "find": null,
        "limit": 50,
        "offset": 0,
        "status": 0,
        "end_date": null,
        "begin_date": null,
        "id_recover": -2,
        "num_recover": 0,
        "typeCp_json": "[]",
        "typeRecover": 0,
        "name_delo_json": "[]",
        "typeDebtor_json": "[]",
        "AdditionalFilters": {
          "flag": 1,
          "fssp": -1,
          "idJud": -1,
          "region": -1,
          "typeCp": [],
          "find_sa": "Все",
          "id_user": -1,
          "name_delo": [],
          "number_ip": null,
          "pensioner": [],
          "typeDebtor": []
        }
      },
      "simpleTemplate": {
        "find": null,
        "limit": 100,
        "id_org": null,
        "offset": 0,
        "curPage": 1,
        "id_recover": null
      },
      "taskSudHistory": {
        "find": null,
        "limit": 50,
        "offset": 0
      },
      "userLoggingAll": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "zaprosBankiEdo": {
        "find": null,
        "limit": 150,
        "offset": 0,
        "curPage": 1,
        "bankStatus": "Все",
        "bankStatusDate": null
      },
      "appealScriptLog": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "audiorecordsLog": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "status": null,
        "curPage": 1,
        "dataEnd": null,
        "dataBegin": null,
        "operatorName": null
      },
      "civilCaseDebtor": {
        "find": null,
        "limit": 100,
        "fields": [],
        "offset": 0,
        "curPage": 1,
        "id_credit": null
      },
      "filterByCession": {
        "id_orgn": -1,
        "id_recover": -1,
        "name_recover": null
      },
      "incomingCallLog": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "status": null,
        "curPage": 1
      },
      "legalEntityType": {
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "planQueuePhones": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "strategyContact": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "userLoggingMain": {
        "org": null,
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "civilCaseHistory": {
        "date": null,
        "limit": 100,
        "offset": 0,
        "curPage": 1
      },
      "fssp_all_postans": {
        "limit": 100,
        "fields": "{\"doc_type\":{\"find\":\"all\",\"name\":\"doc_type\",\"type\":\"list\"}}",
        "offset": 0,
        "curPage": 1,
        "selectIdPost": 0,
        "no_found_only": 0,
        "date_created_all": null,
        "date_created_one": null,
        "date_created_two": null,
        "type_search_date": 0
      },
      "fssp_journal_all": {
        "limit": 100,
        "fields": "{}",
        "offset": 0,
        "curPage": 1,
        "selectIdJournal": 0,
        "type_search_date": 0,
        "date_send_journal": null,
        "date_send_journal_one": null,
        "date_send_journal_two": null
      },
      "bankInterestRates": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "bkiErrorsByCredit": {
        "find": null,
        "idOrg": null,
        "limit": 10,
        "idUser": null,
        "offset": 0,
        "curPage": 1,
        "errType": null,
        "idCredit": null,
        "errorWarn": null
      },
      "civilCaseMovement": {
        "find": null,
        "limit": 100,
        "offset": 0,
        "curPage": 1
      },
      "historyDebtorView": {
        "find": null,
        "limit": 100,
        "offset": 0
      },
      "importGosposhlina": {
        "find": null,
        "limit": 50,
        "offset": 0,
        "status": 0
      },
      "channelPhoneOrgLog": {
        "find": null,
        "idOrg": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "crmAdminUploadFile": {
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "historySoftJournal": {
        "find": null,
        "limit": 100,
        "offset": 0
      },
      "organizationCredit": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "taskPaymentHistory": {
        "find": null,
        "limit": 50,
        "offset": 0
      },
      "archiveDebtorCredit": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "debtorCreditArbitrs": {
        "find": null,
        "limit": 10,
        "dateTo": null,
        "offset": 0,
        "curPage": 1,
        "dateFrom": null,
        "id_recover": null
      },
      "debtorCreditDopsLog": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "status": null,
        "curPage": 1
      },
      "debtorCreditPlanSms": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "fssp_journal_errors": {
        "limit": 100,
        "fields": "{}",
        "offset": 0,
        "curPage": 1,
        "selectIdError": 0,
        "type_search_date": 0,
        "date_send_journal": null,
        "date_send_journal_one": null,
        "date_send_journal_two": null
      },
      "recoverDocumentsLog": {
        "find": null,
        "limit": 10,
        "myType": null,
        "offset": 0,
        "status": null,
        "curPage": 1
      },
      "statusLegalEntities": {
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "bankSberAlfaReturnSa": {
        "find": null,
        "limit": 50,
        "offset": 0
      },
      "debtorCreditPromises": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "status": null,
        "curPage": 1,
        "dataEnd": null,
        "dataBegin": null,
        "last_name": null
      },
      "fssp_all_money_codes": {
        "limit": 100,
        "fields": "{}",
        "offset": 0,
        "curPage": 1,
        "selectIdCode": 0
      },
      "organizationTypeCode": {
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "debtorCreditPlanEmail": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "debtorCreditPlanPhone": {
        "find": null,
        "limit": 10,
        "idUser": null,
        "offset": 0,
        "curPage": 1
      },
      "debtorCreditPlanVoice": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1,
        "dateCall": null,
        "statusId": null
      },
      "universalNotification": {
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "civilCaseExecutiveList": {
        "find": null,
        "limit": 100,
        "offset": 0,
        "curPage": 1
      },
      "debtorCreditPlanLetter": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "settingStadHistoryView": {
        "id": 0,
        "find": null,
        "limit": 100,
        "offset": 0
      },
      "bkiHandbookJudicialActs": {
        "find": null,
        "limit": 10,
        "offset": 0
      },
      "civilAdministrativeCase": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "civilCaseMovementDebtor": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1,
        "id_credit": null
      },
      "historyDebtorCreditView": {
        "find": null,
        "limit": 100,
        "offset": 0
      },
      "separationDebtorCredits": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      },
      "civilCaseHistoryByCredit": {
        "date": null,
        "limit": 100,
        "offset": 0,
        "curPage": 1,
        "idCredit": null
      },
      "debtorCreditDocumentsLog": {
        "find": null,
        "limit": 10,
        "id_org": 0,
        "myType": null,
        "offset": 0,
        "status": null,
        "curPage": 1,
        "id_recover": 0
      },
      "historyDebtorCreditSudView": {
        "find": null,
        "limit": 100,
        "offset": 0
      },
      "indexProductServicePriceLog": {
        "find": null,
        "limit": 10,
        "offset": 0,
        "curPage": 1
      }
    },
    "telegram_id": null,
    "shab": null,
    "shabRecover": [],
    "change_recover": 1,
    "accsess_upload": 1,
    "delete_dos": 0,
    "admin": 0,
    "admin_back": 0,
    "separation_dossiers": 0,
    "accsess_payments": 1,
    "access_regsudact": 1,
    "user_accsess_recover": 0,
    "accsess_debtor_credit": 0,
    "dcdoc_delete_denided": 0,
    "add_prodan": 1,
    "add_dop_var": 1,
    "set_fssp_to_sud": 0,
    "sort_family": 0,
    "poisk": 0,
    "in_line": 0,
    "edit_payments": 0,
    "activeZone": "utc+3",
    "no_change_otvetstv": 1,
    "no_change_status": 0,
    "send_arch": 1,
    "login": null,
    "pass": null,
    "token": null,
    "crypto_key": null,
    "crypto_pass": null,
    "token_two": null,
    "mos_account": null,
    "cookeGosUslugi": null,
    "cookeGosUslugiMos": null,
    "cookeGosUslugiTatar": null,
    "cookeGosUslugiXant": null,
    "cookeGosUslugiMordovia": null,
    "not_dover": 0,
    "not_pay": 0,
    "show_peremen": 1,
    "showDateReturn": 0,
    "showDateSend": 0,
    "showDopGraf": 0,
    "fast": 0,
    "openCreditNewTab": 0,
    "showSettingsRegSud": 0,
    "job_position": null,
    "d_blocked": null,
    "dc_blocked": null,
    "dcs_blocked": null,
    "new_find": 0,
    "add_oper": 0,
    "save_tab": 0,
    "password_changed": 1,
    "token_2fa": null,
    "dostup_postanovke_zadach_rab_prof": 0,
    "clear_after_paste": 0,
    "delete_history_soft": 0,
    "qr_code_required": 0,
    "created_at": "2024-04-25T07:27:53.000000Z",
    "updated_at": "2025-04-22T07:49:33.000000Z"
  },
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvY3JtLm5ia2ZpbmFuY2UucnVcL2FwaVwvbG9nXC9sb2dpbiIsImlhdCI6MTc0NTMwODg5NywiZXhwIjoxNzQ1MzQ0ODk3LCJuYmYiOjE3NDUzMDg4OTcsImp0aSI6Imw5eWJRM3dYZDQycG9oak0iLCJzdWIiOjUwLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.f5eopREqHFzmdXZIZFPhUb02n6uZ86nHQYefF8mU9Ys",
  "token_type": "bearer",
  "expires_in": "2025-04-23T08:01:38.010148Z"
}



