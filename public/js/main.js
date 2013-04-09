var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "wines"	: "list",
        "wines/page/:page"	: "list",
        "wines/add"         : "addWine",
        "wines/:id"         : "wineDetails",
        "about"             : "about",
        "sessiones"         :"sessiones"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },
    sessiones: function(id){
        console.log("Entro a checar el session");
        var col=   new Backbone.Collection();
          col.url="/sessiones";
          col.fetch= function(){
            var collection = this;
             $.ajax({
                 type : 'GET',
                 url : "/sessiones",
                 success : function(data) {
                                // console.log("Viste como lloraba la mama");
                                 for(var i=0;i< data.length;i++){
                                     var item= data[i];
                                    // console.log(item);
                                     collection.add(item);
                                  }
                                     console.log("secccccccccccccccc");
                                     console.log(collection.toJSON());
                                      console.log();
                                     // collection.
                                   //$('#content').html(collection.toJSON());
                                    $("#menuMain").html(new MenuSessionView({model:collection}).render().el);
                                    $("#content").append(new SessionListView({model: collection}).render().el); 
                            }
             });

          };
         
         col.fetch();
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
    'BloqueEventoItemView'
    ], function() {
    app = new AppRouter();
    Backbone.history.start();
});