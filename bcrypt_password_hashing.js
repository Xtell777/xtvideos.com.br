const bcrypt = require('bcrypt');

// Função para criar um hash de senha
async function hashPassword(password) {
  const saltRounds = 10; // Número de rounds de hashing
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// Exemplo de uso:
const password = 'senha123';
hashPassword(password)
  .then(hash => {
    console.log('Senha criptografada:', hash);
  })
  .catch(err => {
    console.error('Erro ao criar hash:', err);
  });

// Função para verificar se a senha corresponde ao hash
async function comparePassword(password, hashedPassword) {
  const match = await bcrypt.compare(password, hashedPassword);
  return match;
}

// Exemplo de uso:
const hashedPassword = '$2b$10$2BpMw2dbWl...'; // Senha criptografada previamente armazenada no banco de dados
comparePassword(password, hashedPassword)
  .then(match => {
    if (match) {
      console.log('As senhas correspondem');
    } else {
      console.log('As senhas não correspondem');
    }
  })
  .catch(err => {
    console.error('Erro ao comparar senhas:', err);
  });

