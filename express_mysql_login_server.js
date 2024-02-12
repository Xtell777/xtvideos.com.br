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

// Função para validar o login
function login(username, password) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    connection.query(query, [username, password], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      if (rows.length === 1) {
        resolve(rows[0]);
      } else {
        reject(new Error('Credenciais inválidas'));
      }
    });
  });
}

// Rota para lidar com solicitações de login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  login(username, password)
    .then(user => {
      res.json({ success: true, message: 'Login bem-sucedido!', user });
    })
    .catch(err => {
      res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor em execução em http://localhost:${port}`);
});

