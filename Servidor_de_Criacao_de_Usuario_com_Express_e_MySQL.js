const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// Configurar o middleware para analisar corpos de solicitação
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configurar a conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tubarao777',
  database: 'mydatabase'
});

// Rota para lidar com solicitações de criação de usuário
app.post('/create-user', (req, res) => {
  const { username, password, email } = req.body;

  // Verificar se o email já está em uso
  connection.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
    if (err) {
      res.status(500).json({ success: false, message: 'Erro interno do servidor' });
      return;
    }

    if (rows.length > 0) {
      res.status(400).json({ success: false, message: 'O email já está em uso' });
      return;
    }

    // Inserir o novo usuário na tabela de usuários
    connection.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, password, email], (err, result) => {
      if (err) {
        res.status(500).json({ success: false, message: 'Erro interno do servidor' });
        return;
      }
      
      res.status(201).json({ success: true, message: 'Usuário criado com sucesso' });
    });
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor em execução em http://localhost:${port}`);
});

