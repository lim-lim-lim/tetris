define([ 'backbone', 'jquery', 'handlebars', 'text!tpl/end.html' ], function( Backbone, $, Handlebars, Template ){


    var _eventDispatcher = null;

    return Backbone.View.extend({
        el:'#world',
        template:Handlebars.compile(Template),
        events:{
            'click #restart':'restart',
            'click #go-home':'goHome'
        },

        initialize:function( option ){
            _eventDispatcher = option.eventDispatcher;
            this.render();
        },
        render:function(){
            var template =  this.template( this.model.toJSON() );
            this.$el.html( template );
            this.$el.hide().fadeIn();
        },
        goHome:function(){
            _eventDispatcher.trigger( 'go-home' );
        },
        restart:function(){
            _eventDispatcher.trigger( 'restart' );
        },
        destory:function(){

        }
    });
});
