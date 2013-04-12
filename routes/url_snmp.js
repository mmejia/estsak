var mongo =require('mongodb');
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('snmpdb', server, {safe: true});

db.open(function(err,db){
	if(!err){
		console.log("Conteado a la base de datos snmpdb");
	}else {
		console.log("Error: "+ err);
	}
});
var obtenerDatosDeInterfaces=function(items,req,res){
     var etch0=[];
    // console.log("obteniendo los datos de las interfaces "+ items);
     for(var i=0;i<items.length;i++){
     	var item= items[i];
        console.log(item);
        if(item!=undefined && item.ifDescr=='eth0'){
        	   var elemento={};
        	   elemento.entrada= item.ifInOctets;
        	   elemento.salida= item.ifOutOctets;
               etch0.push(elemento);
     	}
     }
     console.log("Termindo de generar los items");
     res.send(etch0);

}
exports.etch0= function(req,res){
        console.log("Obtenemos los datos  para construir la grafica del eth0");
        db.collection('interfaces',function(err,collection){
        	collection.find().toArray(function(err,items){
                   obtenerDatosDeInterfaces(items,req,res);
        	 });
        });

      
};
