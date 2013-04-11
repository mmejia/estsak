var util= require('util');
var u= require('./class');
u.leerInterfaces(function(data){
	
   console.log("Session: "+util.inspect(data));

})