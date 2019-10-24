const express = require('express');
const mysql = require('mysql');

const app = express()

const connection = mysql.createConnection({
  host: 'sql3.freesqldatabase.com',
  user: 'sql3309579',
  password: 'MmPNcrPPhy',
  database: 'sql3309579'
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
      console.log(rows)
      //query results
    } else{
      console.log('There was an error in the query')
    }
  })
})

app.listen(4000)