const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Diretório onde os arquivos serão armazenados temporariamente
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nome do arquivo salvo no servidor
    }
});

const upload = multer({ storage: storage });

// Configurações do MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'tubarao777',
    database: 'uploaded_files'
});

db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
    } else {
        console.log('Conectado ao MySQL');
    }
});

// Rota para lidar com o upload do arquivo
app.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;

    // Salvar informações do arquivo no MySQL
    const sql = 'INSERT INTO uploaded_files (name, path) VALUES (?, ?)';
    db.query(sql, [file.originalname, file.path], (err, result) => {
        if (err) {
            console.error('Erro ao salvar informações no MySQL:', err);
            return res.status(500).json({ error: 'Erro interno no servidor' });
        }

        console.log('Informações do arquivo salvas no MySQL');
        return res.status(200).json({ message: 'Upload concluído com sucesso' });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

