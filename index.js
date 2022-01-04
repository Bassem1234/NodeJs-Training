const express = require('express')
var morgan = require('morgan')
require('dotenv').config();
const app = express()
const port = 3000;

//database connection
require('./database/connect');

//bearer strategy with passport
require('./passport/bearerStrategy');

//config body parser

app.use(express.json())

//morgan Config
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({message:'Hello World !'})
})

//require routes
const userApi = require('./routes/userApi');
app.use('/api/v1', userApi);
const todoAPI = require('./routes/todoApi');
app.use('/api/v1', todoAPI);
const emailApi = require('./routes/sendEmailSchemaApi');
app.use('/api/v1', emailApi);

const uploadApi = require('./routes/uploadApi');
app.use( uploadApi);

const authApi = require('./routes/authApi');
app.use('/api/v1',authApi);

// const cron = require('./crons/first-cron');
// app.use(cron);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})