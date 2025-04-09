// Используем CommonJS импорты для совместимости
const fs = require('fs');
const path = require('path');
const process = require('process');

// Проверка наличия модулей
if (!fs || !fs.existsSync) {
  console.error('Ошибка: fs модуль не загружен корректно');
}

if (!path || !path.join) {
  console.error('Ошибка: path модуль не загружен корректно');
}

const __dirnames = process.cwd();

export default function https() {
  try {
    // Дополнительные проверки перед использованием
    if (!fs || !fs.existsSync || !path || !path.join) {
      console.error(
        'HTTPS не может быть настроен: Отсутствуют необходимые модули',
      );
      return null;
    }

    if (fs.existsSync(path.join(__dirnames, 'https'))) {
      const keyPath = path.join(__dirnames, 'https', 'fastify.key');
      const certPath = path.join(__dirnames, 'https', 'fastify.crt');

      if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
        return {
          key: fs.readFileSync(keyPath),
          cert: fs.readFileSync(certPath),
        };
      } else {
        console.error('HTTPS сертификаты не найдены');
        return null;
      }
    }
    return null;
  } catch (error) {
    console.error('Ошибка при настройке HTTPS:', error);
    return null;
  }
}
