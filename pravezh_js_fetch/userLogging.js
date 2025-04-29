fetch("https://crm.nbkfinance.ru/api/userLogging", {
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
    "x-xsrf-token": "eyJpdiI6Im1kamhTSzI1RE1NNXBLbDdlZkh5dnc9PSIsInZhbHVlIjoiaG1sTlY0SExzVXNsYnAyUmUxRXIzalQvL1VjbjBSak5ub0NPQzFRanNDbVBxU2txWjFSNXVtdjdGTGdzYzFtbHBDbGVBdlQ5b0FoZm44dDRPVlFuU1dUMzJUOWJNWE44YVlZcDAvYUU5STMzaUJtQkZ3YU1BaTNkdDI2SDB0L08iLCJtYWMiOiJmNzczMDM5NTBhNTQ3NGUwYmJkNmM1NDQyMzM2MjQ2ODMxNmI3ZTcyYmM5NTQ2MmFlODI0ZGM3ZDYzY2E4NzAxIn0=",
    "cookie": "io=r9ZYvEO3GVBw_3yiAABh; _com.auth0.auth.kg_~LiLr.j2NvsSTUm18fokVybrP8V-T_compat={%22nonce%22:%22Hebk7t41oyn-mG4YvxB2Cw0QT-2ivs5O%22%2C%22state%22:%22kg_~LiLr.j2NvsSTUm18fokVybrP8V-T%22}; com.auth0.auth.kg_~LiLr.j2NvsSTUm18fokVybrP8V-T={%22nonce%22:%22Hebk7t41oyn-mG4YvxB2Cw0QT-2ivs5O%22%2C%22state%22:%22kg_~LiLr.j2NvsSTUm18fokVybrP8V-T%22}; _com.auth0.auth.E9aTPH0aU6Nor_xyTj-fmfvsO.Cq-EVO_compat={%22nonce%22:%22bhXSw1yMRCVwJGa5zl0VB-43Xolvvni9%22%2C%22state%22:%22E9aTPH0aU6Nor_xyTj-fmfvsO.Cq-EVO%22}; com.auth0.auth.E9aTPH0aU6Nor_xyTj-fmfvsO.Cq-EVO={%22nonce%22:%22bhXSw1yMRCVwJGa5zl0VB-43Xolvvni9%22%2C%22state%22:%22E9aTPH0aU6Nor_xyTj-fmfvsO.Cq-EVO%22}; XSRF-TOKEN=eyJpdiI6Im1kamhTSzI1RE1NNXBLbDdlZkh5dnc9PSIsInZhbHVlIjoiaG1sTlY0SExzVXNsYnAyUmUxRXIzalQvL1VjbjBSak5ub0NPQzFRanNDbVBxU2txWjFSNXVtdjdGTGdzYzFtbHBDbGVBdlQ5b0FoZm44dDRPVlFuU1dUMzJUOWJNWE44YVlZcDAvYUU5STMzaUJtQkZ3YU1BaTNkdDI2SDB0L08iLCJtYWMiOiJmNzczMDM5NTBhNTQ3NGUwYmJkNmM1NDQyMzM2MjQ2ODMxNmI3ZTcyYmM5NTQ2MmFlODI0ZGM3ZDYzY2E4NzAxIn0%3D; laravel_session=eyJpdiI6ImhlS3NUWlRvN3FLbzYvM2tnbkltemc9PSIsInZhbHVlIjoiV0MwaU5KMWc0ZEZCcUNLN0dBZDBVUEhOZzJ6MFlnQVFzMGlONmZNMjZCNDg5QnhQWHVwY0xERWtFZ2RnNU1VbWk3c3Rlekd2bGdnU2NJVjFaOUhWc1VFcFVRYnU4T016U1ZVdFBuQ2NMQ1d1VnRKaGVVWElGbmVNZzBKenJOa3UiLCJtYWMiOiIxZDMyMWE5MDkzZTZiY2E5M2YxZDllZWMxZDYwMGJkYmQ2MTlhM2IwYTczMGNhNDkzOGRiM2FiNmRmYTRkZDc2In0%3D",
    "Referer": "https://crm.nbkfinance.ru/import_folder",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  },
  "body": "{\"params\":{\"param\":{\"btnName\":\"Создать задачу\"},\"method\":\"saveUserLogging\"}}",
  "method": "POST"
});