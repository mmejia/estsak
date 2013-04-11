var express = require('express'),
    path = require('path'),
    http = require('http'),
    interfaces=require('./testlib/class');
    _= require('underscore');
    wine = require('./routes/wines');
    principal= require('./libs/dbmysql');

var app = express();
 app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.favicon(__dirname + '/public/img/favicon.ico')); 
});

var cargarSessiones=function(req,res){
    principal.listSessiones(function(result){
      /*La seguridad este es un comentario tonto */
         _.each([1, 2, 3],function(data){console.log('hola mundo '+ data);});
         res.send(result);
    });

};

app.get('/wines', wine.findAll);
app.get('/sessiones',cargarSessiones );
app.get('/interfaces',interfaces.leerJSONInterfaces );
app.get('/wines/:id', wine.findById);
app.post('/wines', wine.addWine);
app.put('/wines/:id', wine.updateWine);
app.delete('/wines/:id', wine.deleteWine);



http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
