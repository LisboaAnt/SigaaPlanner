const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const pgp = require('pg-promise')();
const jwt = require('jsonwebtoken'); // Importe a biblioteca JWT
const cors = require('cors');

const sigaa = require("./routes/sigaa");

const app = express();
app.use(cors({ origin: '*' }));
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

// Configurar a conexão com o PostgreSQL
const db = pgp({
  connectionString: 'postgres://login:login@localhost:5432/test01'
});

// Rota para renderizar o arquivo home.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'page','page.html'));
});

// Se a rota tiver errada ele vai pra home
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/page', 'page.html'));
});



// Rota para USUARIO, como cadastro, edição, etc.
const userRoutes = require('./routes/userRoutes')(db, jwt);
app.use('/user', userRoutes);

// Rota para descodificar o jwt, retorna um json com o token
const jwtRoutes = require('./routes/jwtRoutes')(jwt);
app.use('/descode',jwtRoutes);

// Rota para atividades
const ativRoutes = require('./routes/ativRoutes')(db);
app.use('/ativ',ativRoutes);

// Rota para anotacoes
const anotaRoutes = require('./routes/anotaRoutes')(db);
app.use('/anota', anotaRoutes);

// Rota para Professor
const professorRoutes = require('./routes/professorRoutes')(db);
app.use('/professor', professorRoutes);

// Rota para nota
const notaRoutes = require('./routes/notaRoutes')(db);
app.use('/nota', notaRoutes);

// Rota para diciplina
const diciplinaRoutes = require('./routes/diciplinaRoutes')(db);
app.use('/diciplina', diciplinaRoutes);

// Rota para amizade
const amizadeRoutes = require('./routes/amizadeRoutes')(db);
app.use('/amizade', amizadeRoutes);

// Rota para academico
const academicoRoutes = require('./routes/academicoRoutes')(db);
app.use('/academico', academicoRoutes);



app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

app.post("/sigaa", (req, res) => {
  const { login, senha } = req.body;
  sigaa.access(login, senha).then((response) => {
    res.send(sigaa.scrape(response, login));
  });
});




//ROTAS API SIGAA

