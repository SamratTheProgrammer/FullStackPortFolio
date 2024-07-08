const mysql = require("mysql");
const con =mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"bca3rd30901222131",
    database:"contact_info"
});
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path=require('path');
app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res) {
  res.send("active");
});

app.post('/', function(req, res){
  const full_name = req.body.full_name;
  const email = req.body.email;
  const mno = req.body.mno;
  const text = req.body.text;
  const sent_text = req.body.sent_text;

  con.connect(function(error){
    if(error) throw error;
    const sql= "INSERT INTO contact(full_Name,email,mobile_Num,topic,message) VALUES(?,?,?,?,?)";
    con.query(sql,[full_name,email,mno,text,sent_text],function(error,result){
      if(error) throw error;
      res.redirect('/thankyou.html');
    });
  });
});
app.listen(2000,()=>{
    console.log('activate')
});