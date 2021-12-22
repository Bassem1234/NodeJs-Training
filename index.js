const express = require('express')
var morgan = require('morgan')
const app = express()
const port = 3000;

//database connection
require('./database/connect');


//config body parser

app.use(express.json())

//morgan Config
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.json({message:'Hello World !'})
})

//require routes
const userApi = require('./routes/userApi');
app.use('', userApi);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})