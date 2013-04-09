var principal= require("./dbmysql");
principal.listarSessiones();
 
principal.on("evt_SessionesCargadas",function(data){


	  console.log(JSON.stringify(data));
})