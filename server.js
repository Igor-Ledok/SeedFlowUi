const express = require('express');
const path = require('path');

const app = express();

// Указываем Express использовать статические файлы из папки сборки Angular
app.use(express.static(path.join(__dirname, '/dist/crowd-fund-platform/browser')));

// Обрабатываем все остальные маршруты и возвращаем index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/crowd-fund-platform/browser/index.html'));
});

// Устанавливаем порт, предоставленный Heroku, или 8080 по умолчанию
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});