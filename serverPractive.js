var express =  require("express");
var app = express();

app.use(log);

function log(req,res,next){
	console.log("log funciton calls");
	next();
}



app.listen('3030',function (argument) {
	console.log("sever started at port 3030");
})

app.get('/api/:id',log,function(req,res,next){
	console.log("get method call");
	console.log(req.params.id);
	res.end(req.params.id);
})
