define( [ 'backbone', 'jquery', 'handlebars', 'game/game-world', 'text!tpl/game.html' ], function( Backbone, $, Handlebars, World, Template ){

    var _world = null;
    var _eventDispatcher = null;

    return Backbone.View.extend({
        el:'#world',
        template:Handlebars.compile(Template),
        events:{

        },

        initialize:function( option ){
            _eventDispatcher = option.eventDispatcher;
            this.render();
        },

        render:function(){
            var template =  this.template();
            this.$el.html( template );
            this.$el.hide().fadeIn();
            var $stage = $('#game-stage');
            var gameContext = $stage[ 0].getContext( '2d' );
            var bgContext = $( '#game-bg' )[ 0].getContext( '2d' );
            var width = $stage.width();
            var height = $stage.height();
            gameContext.width = bgContext.width = width;
            gameContext.height = bgContext.height = height;
            _world = new World( gameContext, bgContext, _eventDispatcher, this.model );
        },
        destory:function(){
            if( _world ){
                _world.destory();
                _world = null;
            }
        }
    });
});
