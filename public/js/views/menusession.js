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
         	 //var sel_ses=var ses= _.where(sessiones,{SESSION_ID:sel});
             _.each(sessiones,function(dd){
                      if(dd.SESSION_ID==sel){
                           $('#menuSession',this.el).append('<li class="active"><a href="#">'+dd.SESSION_ID+'</a></li>');
                      }else{
                            $('#menuSession',this.el).append('<li><a id="'+dd.SES+'" href="#">'+dd.SESSION_ID+'</a></li>');
                      }
              
             });
             
              console.log(this.el);
         	return this;
         }
     }
	);