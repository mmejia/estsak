/**
 * New node file
 */
var mysql = require('mysql');
var util=require("util");
var events= require("events");
var async = require('asyncjs');
  
 var m_pwd='sys007';
 var m_user='root';
 var m_host='localhost';
 var m_port='3306';
 var m_database='respaldo21102011';
 
var MySQLSakai=(function(){

     var sessiones=[];
     var db=mysql.createConnection({
        user:m_user,
        password:m_pwd,
        host:m_host,
        port:m_port,
         database:m_database,
        insecureAuth: true 
      });
    db.connect();
    listarSessiones=function(fn){
     
    console.log("Iniciando el listar de sessiones");
       var consulta=
         " select \
                       sakai_session.SESSION_ID  as SESSION_ID, \
                       sakai_session.SESSION_SERVER as SESSION_SERVER,  \
                       sakai_session.SESSION_USER as SESSION_USER ,    \
                       sakai_session.SESSION_IP as  SESSION_IP , \
                       sakai_session.SESSION_USER_AGENT as SESSION_USER_AGENT,\
                       sakai_session.SESSION_START as   SESSION_START, \
                       sakai_session.SESSION_END as    SESSION_END,\
                       sakai_session.SESSION_ACTIVE as SESSION_ACTIVE,\
                       sakai_user_id_map.EID as USUARIO  \
                       from sakai_session \
                       inner join sakai_user_id_map on sakai_session.SESSION_USER= sakai_user_id_map.USER_ID \
                        order by sakai_session.SESSION_START DESC LIMIT 25";
                    db.query(consulta,function(err, rows, fields){
                      if(err){
                        fn(err);
                      }
                    for(var i=0;i<rows.length;i++){
                          var r= rows[i];
                         // console.log(r);
                           sessiones.push(
                          {
                               SESSION_ID:  r.SESSION_ID,
                               SESSION_SERVER:r.SESSION_SERVER,
                               SESSION_USER: r.SESSION_USER,
                               SESSION_IP: r.SESSION_IP,
                               SESSION_USER_AGENT: r.SESSION_USER_AGENT,
                               SESSION_START: r.SESSION_START,
                               SESSION_END: r.SESSION_END,
                               SESSION_ACTIVE: r.SESSION_ACTIVE,
                               USUARIO: r.USUARIO,
                               EVENTOS:[]
                           });

                      }
                    agregarEventos(sessiones,[],fn);
                      
                });
              
      };
     agregarEventos= function(sessiones,resultado,fn){
         // console.log(result.sessiones);
          
          var ses= sessiones.shift();
          if(!ses){
             db.end();
            fn(resultado);
          }else{
            var eventos=[];
            var qry_evento="select * from sakai_event where session_id='"+ ses.SESSION_ID+"'";
             db.query(qry_evento,function(err, rows, fields){
                 if(err){
                  fn(err);
                 }else{
                    for(var j=0;j<rows.length;j++){
                         var r= rows[j];
                          eventos.push({
                              EVENT_ID :r.EVENT_ID,  
                              EVENT_DATE:r.EVENT_DATE, 
                              EVENT   :r.EVENT,   
                              REF  :r.REF,      
                              SESSION_ID :r.SESSION_ID,
                              EVENT_CODE :r.EVENT_CODE
                           });
                    }
                  ses.EVENTOS=eventos;
                  resultado.push(ses);
                  agregarEventos(sessiones,resultado,fn);
              }
          });
    } 
  } ; 
   return{ listSessiones: function(fn) {
                                listarSessiones(fn);
                               
                          },
         };
}());
       
 module.exports=MySQLSakai;

   
            
            
   //Using async.js
 

 