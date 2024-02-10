const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const mysql = require('mysql');
const multer = require('multer');

const app = express();

// Middlewares de segurança
app.use(helmet()); // Adiciona headers de segurança HTTP
app.use(express.json()); // Habilita o parsing de JSON
app.use(express.urlencoded({ extended: true })); // Habilita o parsing de dados de formulário
app.use(cors()); // Configuração básica do CORS para permitir solicitações de outros domínios

// Limita o número de solicitações por IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // Limite de 100 solicitações por IP
});
app.use('/api/', limiter);

// Configuração do multer para upload de arquivos
const upload = multer({ dest: 'uploads/' });

// Conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tubarao777',
  database: 'streamflix_db',
  multipleStatements: false // Impede múltiplas instruções SQL em uma única consulta
});

// Middleware para proteger contra injeção de SQL
app.use((req, res, next) => {
  req.body = sanitizeData(req.body);
  req.params = sanitizeData(req.params);
  req.query = sanitizeData(req.query);
  next();
});

// Função para sanitizar dados
function sanitizeData(data) {
  for (let key in data) {
    if (typeof data[key] === 'string') {
      data[key] = data[key].replace(/['"\\]/g, ''); // Remove aspas simples, aspas duplas e barras invertidas
    }
  }
  return data;
}

// Rota de upload de arquivos
app.post('/api/upload', upload.single('file'), (req, res) => {
  // Código de manipulação de upload de arquivos
});

// Outras rotas e configurações...

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
