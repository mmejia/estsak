window.SessionListView= Backbone.View.extend({
     initialize:function(){
     	//this.render();
     },
     render:function(){
     	var sessiones= this.model;
      var sel= this.options.sel;
      var current= _.find(sessiones,{SESSION_ID:sel})
       var actual=current[0];
     	 $(this.el).html(this.template());
         $(this.el).addClass('span12');
          
          
         
     		$('#sessiones tbody',this.el).append(new SessionListItemView({model:actual}).render().el);
            var eventos= current.EVENTOS;
            var ar_tmp=[];
            var lens_eventos= eventos.lensgth;
            var bloques= lens_eventos/3;
            var modulos= lens_eventos%3;
            var tmp=0;
            var bloque=[];
            for(j=0;j<lens_eventos;j++){
                if(tmp==2){
                    $(this.el).append(new BloqueEventoView({model:bloque}).render().el);
                    bloque=[];
                    tmp=0;
                }else{
                   var evt= eventos[j];
                   bloque.push(evt);
                   if(j+1==lens_eventos){
                       $(this.el).append(new BloqueEventoView({model:bloque}).render().el);
                     
                   }
                   tmp++; 
                }
                  
               }
       
        return this;
     }
 
});
window.BloqueEventoView= Backbone.View.extend({
       initialize:function(){
       // this.render();
       },
       render:function(){
           var bloques= this.model;
           var lens=bloques.lensgth;
           $(this.el).addClass('row-flow');
           for(var i=0;i<lens;i++){
               $(this.el).append(new BloqueEventoItemView({model:bloques[i]}).render().el);
           }
           
         return this;
       }
 
})
window.BloqueEventoItemView=Backbone.View.extend({
    initialize:function(){
        //this.render();
    },
    render:function(){
         var evt= this.model;
         $(this.el).addClass('span4');
         $(this.el).html(this.template(this.model));
         return this;
    }
})
window.SessionListItemView= Backbone.View.extend({
     tagName:"tr",
     render: function(){
     	$(this.el).html(this.template(this.model));
     	return this;
     }

});
