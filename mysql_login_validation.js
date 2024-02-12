// Importar o módulo mysql
const mysql = require('mysql');

// Configurar a conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'mydatabase' // Nome do banco de dados que você criou
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL');
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

// Exemplo de uso da função de login
const username = 'exemplo';
const password = 'senha';
login(username, password)
  .then(user => {
    console.log('Login bem-sucedido! Bem-vindo,', user.username);
  })
  .catch(err => {
    console.error('Erro ao fazer login:', err.message);
  });

// Fechar a conexão com o banco de dados ao encerrar o script
connection.end();

