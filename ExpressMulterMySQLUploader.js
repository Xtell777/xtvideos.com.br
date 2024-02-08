const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Root',
  password: 'tubarao777',
  database: 'streamflix_db'
});

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão ao banco de dados estabelecida');
});

app.post('/upload', upload.single('file'), (req, res) => {
  const { title, description } = req.body;
  const filePath = req.file.path;

  const sql = 'INSERT INTO uploaded_files (title, description, file_path) VALUES (?, ?, ?)';
  connection.query(sql, [title, description, filePath], (err, result) => {
    if (err) {
      console.error('Erro ao inserir arquivo no banco de dados:', err);
      res.status(500).send('Erro ao enviar o arquivo.');
      return;
    }
    res.send('Arquivo enviado com sucesso!');
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
