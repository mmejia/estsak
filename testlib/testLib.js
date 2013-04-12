var util= require('util');
var u= require('./class');
var mongo= require('mongodb');
var Server= mongo.Server;
var Db= mongo.Db;
var BSON =mongo.BSONPure;
var server= new Server('localhost',27017,{auto_reconnect:true});
db= new Db('snmpdb',server,{safe:true});
var equipo={
   hostname:"sakai2",
   ip:'172.16.177.132',
   comunidad:'adminjava'
};
var intervalo=(5)*60*1000;
setInterval(doStuff,intervalo);

function doStuff(){
u.leerInterfaces(function(data){
  console.log("Iniciando la lectura de las interfaces");
	data.equipo=equipo;
   db.collection('interfaces',function(err,collection){
   	     collection.insert(data,{safe:true},function(err,result){
                 if(err){
          	             console.log("Error al intentar guardar la coleccion en el mongodb");
                 }else {
          	            console.log("Se agrega la lectura de interfaces "+JSON.stringify(result[0]));

                }
         });
   	 });
   //console.log("Session: "+util.inspect(data));

});
}