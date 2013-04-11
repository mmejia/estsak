 var _=require('underscore');
 
 var objectA = {
 	hola:'Soy el hola de A',
    aFunction: function() {console.log('Vamos a imprimir el hola: '+ this.hola)},
    anAttribute: 'foo'
};
var objectB = {
	hola:"Acelerado",
    anotherFunction: function() { console.log("Vamos a mensajear el hola; "+ hola)},
    anotherAttribute: 'bar'
};
_.extend(objectA, {});
objectA.aFunction();