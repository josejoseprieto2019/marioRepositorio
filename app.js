var express = require("express");
var app = express();

var router = express.Router();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('public'));

var path = __dirname + '/views/';

var customers = [];

router.use(function (req,res,next) {
  //console.log("/mmmmmmmmmmmmmmmm" + req.method);
  next();
});

app.get("/",function(req,res){
  //console.log("/xxxxxxxxxxxxxx" + req.method);
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
	let customers = []; 
	let customer = {};
	customer.firstname = Math.round(1000+Math.random()*1000);
	customer.lastname = '11';
	
	var getJSON = require('get-json')
//
	let valor=req.query.url;
	if(req.query.url != undefined){
		getJSON(valor)
			.then(function(response) {
						var c=response.elements[0].rating;	
						if(c!=undefined)
						{
							customer.lastname = c;
							customers.push(customer);
							return res.send(customers);
						}
			}).catch(function(error) {
				return res.send('Escribiste mal direccion del JSON json !');
				//console.log(error);
			});
}else{
	getJSON('https://v20.lvis.io/feeds/latest_results/7/23687f6b-a3c2-45ea-86d3-03b3691f1752.json')
	.then(function(response) {
				var c = response.elements[0].rating;		
				if(c!=undefined)
				{
					customer.lastname = c;
					customers.push(customer);
					return res.send(customers);
				}
	}).catch(function(error) {
		return res.send('Escribiste mal direccion del JSON json !');
	});

}


//marco
// //	getJSON('https://v20.lvis.io/feeds/latest_results/7/72d0ab6d-3c52-413f-871e-fb47f8aef162.json', function(error, response){
// //	getJSON('https://v20.lvis.io/feeds/latest_results/7/23687f6b-a3c2-45ea-86d3-03b3691f1752.json', function(error, response){
// 		getJSON(valor, function(error, response){
// 			// if(!error){
// 			// 	console.log(valor);
// 			// 	var c=response.elements[0].rating;		
// 			// 	if(c!=undefined)
// 			// 	{
// 			// 		customer.lastname = c;
// 			// 		customers.push(customer);
// 			// 		return res.send(customers);
// 			// 		}
// 			// 	}
// 		 });
});

app.use("/",router);

app.use("*",function(req,res){
  res.sendFile(path + "404.html"); 
});

app.set('port', process.env.PORT || 80); 
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
}); 

