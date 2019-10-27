const express = require('express');
const mysql = require('mysql'); 
const cors = require('cors');
require('dotenv').config()

const app = express()
const port = process.env.PORT || 4000;

app.use(express.json())
app.use(cors())

const connection = mysql.createConnection({
  host: process.env.DB_HOST, 
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

connection.connect(function(error){
  if(!error){
    console.log('connected');
  } else {
    console.log('Error!')
  }
})

app.get('/', function(req,res){
  connection.query("SELECT * FROM ToDo", function(error, rows, fields){
    if(!error){
      console.log('sucessful query');
      res.send(rows)
      //query results
    } else{
      console.log('There was an error in the query')
    }
  })
})

app.post('/', function(req,res){
  const body = req.body
  if(!body){
    console.log('no data in body')
  }
  connection.query("INSERT INTO ToDo SET ? ", body, function(error, results, fields){
    if(error) console.log('error')
    res.send(JSON.stringify('inserted id: '+results.insertId))
  })
})

app.put('/:ID', function(req,res){
  const body = req.body
  connection.query("UPDATE ToDo SET ? WHERE _id=?", [body, req.params.ID], 
  function(error, results, fields){
    if(!error){
      res.send('user updated sucessfully','\n', results)
    }
  })
})

app.delete('/:ID', function(req,res){
  connection.query("DELETE FROM ToDo where _id =?", [req.params.ID], function(error, results, fields){
    if(!error) 
    res.send('delete sucessful ID:' + req.params.ID)
    else console.log(error)
  })
})

app.listen(port, ()=> console.log(`app listening on port ${port}`))