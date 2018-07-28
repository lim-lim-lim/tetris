define( [ 'backbone', 'jquery', 'handlebars', 'game/controller', 'game/model-user-info', 'text!tpl/home.html', 'text!tpl/ranker.html' ], function( Backbone, $, Handlebars, Controller, UserInfo, homeTpl, rankerTpl ){

    var _userNameStorageKey = 'TETRIS-USER-NAME';
    var _eventDispatcher = null;

    return Backbone.View.extend({
        el:'#world',
        template:Handlebars.compile(homeTpl),
        rankerTemplate:Handlebars.compile(rankerTpl),
        events:{
            'click #regist-name': 'enterUserName',
            'click #start-btn': 'startup',
            'click #show-rank': 'showRank'
        },

        initialize:function(option){
            this.model.set( 'name', localStorage.getItem( _userNameStorageKey ) );
            _eventDispatcher = option.eventDispatcher;
            this.render();
        },
        render:function(){
            var template =  this.template( this.model.toJSON() );
            this.$el.html( template );
            this.$el.hide().fadeIn();
        },
        startup:function(){
            _eventDispatcher.trigger( 'startup-game' );
        },
        showRank:function(){
            var $rankerContainer = $( '#ranker-container' );
            if( $rankerContainer.length ){
                $rankerContainer.fadeOut( 200, function(){
                    $rankerContainer.remove();
                } );
                return;
            }
            var self = this;
            var deferred = Controller.getRankerList();
            if( deferred ){
                deferred.done( function(data){
                    var $template = $(self.rankerTemplate( data ));
                    self.$el.append( $template );
                    $template.hide();
                    $template.fadeIn(100)
                })
            }
        },
        enterUserName:function( ){
            var name = $('#user-name').val();
            localStorage.setItem( _userNameStorageKey, name );
            this.model.set( 'name', name );
            this.render();
        },
        destory:function(){

        }
    });
});


