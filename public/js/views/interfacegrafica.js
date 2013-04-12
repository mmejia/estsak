window.InterfaceGraficaView= Backbone.View.extend({
       initialize:function(){},
       render:function(){
       	  var datos= this.model.models;
       	  for(var i=0;i<datos.length;)
       	  $(this.el).html(this.template());
       	  return this;
       }
});