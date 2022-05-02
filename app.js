const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { options } = require("nodemon/lib/config");
const { response } = require("express");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
var firstName=req.body.lname;
var lastName=req.body.lname;
var email=req.body.email;
var data={
  members:[{
    email_address:email,
    status:"subscribed",
    merge_fields: {
      FNAME:firstName,
      LNAME:lastName
    }
  }
  ]
};
var jsonData=JSON.stringify(data);
var options={
  url:"https://us10.api.mailchimp.com/3.0/lists/475110860a",
  method:"POST",
  headers:{
    "Authorization":"sanjoy1 bce8a7fec1467f9fda013f55a76e5f9f-us10"
  },
  body:jsonData

};

request(options,(error,response,body)=>{
if(error){
  console.log(error);
}else{
  console.log(response.statusCode);
}
});

});

app.listen(3000,function(){
  console.log('server is running on port 3000');
});
//api key
//bce8a7fec1467f9fda013f55a76e5f9f-us10
//list id
//475110860a