const express = require('express')
var morgan = require('morgan')
const app = express()
const port = 3000
//morgan Config
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Hello World world!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})