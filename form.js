require('dotenv').config();

const mysql = require("mysql");
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Database connection
const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Middleware
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.get('/', function(req, res) {
  res.send("active");
});

app.post('/', function(req, res){
  const {full_name, email, mno, text, sent_text} = req.body;

  con.connect(function(error){
    if(error) throw error;
    const sql = "INSERT INTO contact(full_Name,email,mobile_Num,topic,message) VALUES(?,?,?,?,?)";
    con.query(sql, [full_name, email, mno, text, sent_text], function(error, result){
      if(error) throw error;
      res.redirect('/thankyou.html');
    });
  });
});

// Start server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server active on port ${PORT}`);
});