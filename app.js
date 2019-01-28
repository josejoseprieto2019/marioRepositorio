var express = require("express");
var app = express();

var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('public'));

var path = __dirname + '/views/';

var customers = [];

router.use(function (req,res,next) {
  console.log("/mmmmmmmmmmmmmmmm" + req.method);
  next();
});

app.get("/",function(req,res){
  console.log("/xxxxxxxxxxxxxx" + req.method);
  res.sendFile(path + "index.html");
});

app.get("/veo",function(req,res){
	console.log("/__________" + req.method);
	res.send('hola')
  //res.sendFile(path + "index.html");
});


app.post("/api/customers/save", function(req,res){
	console.log('Post a Customer: ' + JSON.stringify(req.body));
	var customer = {};
	customer.firstname = req.body.firstname;
	customer.lastname = req.body.lastname;
	
	customers.push(customer);
	
	return res.send(customer);
});

app.get("/api/customers/all", function(req,res){
	console.log("Get All Customers");
	let customers = [];
	let customer = {};
	customer.firstname = Math.round(1000+Math.random()*1000);
	customer.lastname = '11';
	
	var getJSON = require('get-json')
	getJSON('https://v20.lvis.io/feeds/latest_results/7/72d0ab6d-3c52-413f-871e-fb47f8aef162.json', function(error, response){
				h = JSON.stringify(response );
				let n
				if(h!=undefined)
				{
					let n = h.indexOf('rating',1)
					let resu = h.substring( n+8 , n+13);
					console.log(resu + customer.lastname)
					customer.lastname = resu;
					customers.push(customer);
					return res.send(customers);
			}
			 else{let n =0}
			 
			// let resu = h.substring( n , n+14);			
			// customer.lastname='12'
			// console.log(resu + customer.lastname)
		   return response
		});
		
	// customers.push(customer);
	// return res.send(customers);
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html"); 
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
}); 

