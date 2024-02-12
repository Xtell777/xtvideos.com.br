const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
app.post('/create-user', async (req, res) => {
  const { username, password, email } = req.body;

  // Verificar se os campos obrigatórios foram fornecidos
  if (!username || !password || !email) {
    return res.status(400).json({ success: false, message: 'Todos os campos são obrigatórios' });
  }

  try {
    // Verificar se o email já está em uso
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'O email já está em uso' });
    }

    // Hash da senha
    const hashedPassword = await hashPassword(password);

    // Inserir o novo usuário na tabela de usuários
    await insertUser(username, hashedPassword, email);

    // Gerar token de sessão
    const token = generateToken({ username, email });

    res.status(201).json({ success: true, message: 'Usuário criado com sucesso', token });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ success: false, message: 'Erro interno do servidor' });
  }
});

// Função para obter usuário pelo email
function getUserByEmail(email) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows[0]);
    });
  });
}

// Função para inserir usuário na tabela de usuários
function insertUser(username, password, email) {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO users (username, password, email) VALUES (?, ?, ?)', [username, password, email], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

// Função para criar hash da senha
async function hashPassword(password) {
  const saltRounds = 10; // Número de rounds de hashing
  return await bcrypt.hash(password, saltRounds);
}

// Função para gerar token de sessão
function generateToken(data) {
  const secretKey = 'tubarao777';
  return jwt.sign(data, secretKey, { expiresIn: '1h' }); // Expira em 1 hora
}

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor em execução em http://localhost:${port}`);
});

