// Importar o módulo mysql
const mysql = require('mysql');

// Configurar a conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tubarao777',
  database: 'mydatabase' // Nome do banco de dados que você criou
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL');
});

// Exemplo de inserção de um novo usuário
const newUser = { username: 'exemplo', password: 'senha', email: 'exemplo@email.com' };
connection.query('INSERT INTO users SET ?', newUser, (err, result) => {
  if (err) throw err;
  console.log('Novo usuário inserido com sucesso:', result.insertId);
});

// Exemplo de consulta para buscar todos os usuários
connection.query('SELECT * FROM users', (err, rows) => {
  if (err) throw err;
  console.log('Usuários encontrados:');
  rows.forEach(row => {
    console.log(row);
  });
});

// Fechar a conexão com o banco de dados ao encerrar o script
connection.end();

