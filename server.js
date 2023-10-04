var express = require('express')
var app = express()
var db = require('./connection')
var bodyParser = require('body-parser')
var cors = require('cors')
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(cors({credentials: true,}));//To enable HTTP cookies over CORS,while making the AJAX request.

// mysql
function selectUser() {
  return new Promise((resolve, reject) => {
    let sql = `Select * from user`
    db.query(sql, (err, result) => {
      if (err) throw err
      resolve(result)
      // console.log('db select query result',result);
    })
  })
}

let insertUser = (name, msg) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO user (name, message) VALUES ('${name}','${msg}')`
    db.query(sql, (err, result) => {
      if (err) { reject(err) }
      resolve(result)
    })
  })
}

// routes
app.get('/messages', async (req, res) => {
    let data
  await selectUser().then((response) => {
    JSON.stringify(response)
    data = response
    console.log(data);
    
  })
  res.send(data)
})

app.post('/messages', async (req, res) => {
  await insertUser(req.body.name, req.body.message).then(() => {
    // console.log('Not capturing insert query from db');
  }).catch(() => {
    res.sendStatus(500)
  })
  res.sendStatus(200)
})

// port
var server = app.listen(3000, () => {
  console.log('Server is running on port', server.address().port);

})