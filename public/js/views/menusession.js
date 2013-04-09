window.MenuSessionView= Backbone.View.extend(
     {

        events: {
    "click #menuSession li"                : "cargarSession"
     
     },
         initialize:function(){
         	this.render();
           // this.model.bind("click #menuSession .nav-header",this.cargarSession,this);
         },
         cargarSession:function(obj){
                  
              $("#content").html("new      "); 
         },
         render:function(){
         	var sessiones=this.model;
            var sel= this.options.sel;
         	var len= sessiones.length;
         	$(this.el).html(this.template());
         	 for(var i=0;i<len;i++){
         	 	    var ses= sessiones[i];
         	 	   // var sis= ses.toJSON;
         	 	    if(i==sel){
     		            $('#menuSession',this.el).append('<li class="active"><a href="#">'+ses.SESSION_ID+'</a></li>');
     		        }else{
     		        	$('#menuSession',this.el).append('<li><a id="'+ses.SES+'" href="#">'+ses.SESSION_ID+'</a></li>');
     		        } 

              }
              console.log(this.el);
         	return this;
         }
     }
	);