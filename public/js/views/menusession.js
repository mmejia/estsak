window.MenuSessionView= Backbone.View.extend(
     {
         initialize:function(){
         	this.render();
         },
         render:function(){
         	var sessiones=this.model.toJSON();
         	var len= sessiones.length;
         	$(this.el).html(this.template());
         	 for(var i=0;i<len;i++){
         	 	    var ses= sessiones[i];
         	 	   // var sis= ses.toJSON;
         	 	    if(i==0){
     		            $('#menuSession',this.el).append('<li class="active"><a href="#">'+ses.SESSION_ID+'</a></li>');
     		        }else{
     		        	$('#menuSession',this.el).append('<li><a href="#">'+ses.SESSION_ID+'</a></li>');
     		        } 

              }
              console.log(this.el);
         	return this;
         }
     }
	);