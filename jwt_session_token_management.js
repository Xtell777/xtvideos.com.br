const jwt = require('jsonwebtoken');

// Função para gerar um token de sessão
function generateToken(user) {
  const secretKey = 'tubarao777'; // Chave secreta para assinar o token
  const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' }); // Expira em 1 hora
  return token;
}

// Exemplo de uso:
const user = { id: 1, username: 'exemplo' };
const token = generateToken(user);
console.log('Token de sessão:', token);

// Função para verificar e decodificar um token de sessão
function verifyToken(token) {
  const secretKey = 'tubarao777';
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.user;
  } catch (error) {
    throw new Error('Token inválido');
  }
}

// Exemplo de uso:
try {
  const decodedUser = verifyToken(token);
  console.log('Usuário decodificado:', decodedUser);
} catch (error) {
  console.error('Erro ao verificar token:', error.message);
}

