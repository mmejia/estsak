window.Wine = Backbone.Model.extend({

    urlRoot: "/wines",

    idAttribute: "_id",

    initialize: function () {
        this.validators = {};

        this.validators.name = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a name"};
        };

        this.validators.grapes = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a grape variety"};
        };

        this.validators.country = function (value) {
            return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a country"};
        };
    },

    validateItem: function (key) {
        return (this.validators[key]) ? this.validators[key](this.get(key)) : {isValid: true};
    },

    // TODO: Implement Backbone's standard validate() method instead.
    validateAll: function () {

        var messages = {};

        for (var key in this.validators) {
            if(this.validators.hasOwnProperty(key)) {
                var check = this.validators[key](this.get(key));
                if (check.isValid === false) {
                    messages[key] = check.message;
                }
            }
        }

        return _.size(messages) > 0 ? {isValid: false, messages: messages} : {isValid: true};
    },

    defaults: {
        _id: null,
        name: "",
        grapes: "",
        country: "USA",
        region: "California",
        year: "",
        description: "",
        picture: null
    }
});
window.Ses = Backbone.Model.extend({
 
  defaults : {
    SESSION_ID: "",
    SESSION_SERVER: "",
    SESSION_USER: "",
    SESSION_IP: "",
    SESSION_USER_AGENT: "",
    SESSION_START: "",
    SESSION_END: "",
    SESSION_ACTIVE: 1,
    USUARIO: "",
    EVENTOS:[]
   },
    
   urlRoot: '/sessiones/',
   idAttribute: "SESSION_ID"
});
 
window.WineCollection = Backbone.Collection.extend({
   
     
    url: "/wines"
});
window.Etch0Collection= Backbone.Collection.extend({
     url:"/interfaces/etch0"
});
window.SessionCollection=Backbone.Collection.extend({
    fetch: function(fn){
              $.ajax({
                 type : 'GET',
                 url : "/sessiones",
                 success : function(data) {
                                // console.log("Viste como lloraba la mama");
                                 var collection=[];
                                  for(var i=0;i< data.length;i++){
                                     var item= data[i];
                                      collection.push(item);
                                }
                                fn(collection); 
                            }

                 });

    },

});