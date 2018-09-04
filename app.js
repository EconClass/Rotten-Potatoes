// INITIAL STATE
const express = require('express')
const app = express()

// ROOT
app.get('/', (req, res) => {
  res.render('home', { msg: 'Hello World!' });
})

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
