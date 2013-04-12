var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "sessiones",
        "wines"	: "list",
        "wines/page/:page"	: "list",
        "wines/add"         : "addWine",
        "wines/:id"         : "wineDetails",
        "about"             : "about",
        "sessiones"         :"sessiones",
        "interfaces/etch0/"  :"etch0"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html("<h3>Pagina de inicio del sistema </h3>");
        //this.headerView.selectMenuItem('home-menu');
    },
    etch0: function(){
         console.log("Entro a generar la grafica del eth0");
         var col=new Etch0Collection();
         col.fetch({success: function(){
            $("#content").html(new InterfaceGraficaView({model:col}).render().el);
        }});
        
         
    },
    sessiones: function(){
        console.log("Entro a checar el session");
        var col=new SessionCollection();
          col.fetch(function(datos){ 
            var seleccionar=10;
            var ses= datos[0].SESSION_ID;
             $("#menuMain").html(new MenuSessionView({model:datos,sel:ses}).render().el);
            $("#content").append(new SessionListView({model: datos,sel:ses}).render().el); 
           });
       
       // console.log(col.toJSON());
         
        
    },
	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var wineList = new WineCollection();
        wineList.fetch({success: function(){
            $("#content").html(new WineListView({model: wineList, page: p}).el);
        }});
        this.headerView.selectMenuItem('home-menu');
    },

    wineDetails: function (id) {
        var wine = new Wine({_id: id});
        wine.fetch({success: function(){
            $("#content").html(new WineView({model: wine}).el);
        }});
        this.headerView.selectMenuItem();
    },

	addWine: function() {
        var wine = new Wine();
        $('#content').html(new WineView({model: wine}).el);
        this.headerView.selectMenuItem('add-menu');
	},

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    },
    showSession:function(){
      $('#content').html(new ShowSession().el);
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'WineView', 
    'WineListItemView', 'AboutView','SessionListView',
    'SessionListItemView','MenuSessionView',
    'BloqueEventoItemView','InterfaceGraficaView'
    ], function() {
    app = new AppRouter();
    Backbone.history.start();
});