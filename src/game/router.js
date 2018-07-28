

define( ['backbone', 'game/view-home', 'game/view-game', 'game/view-end'], function( Backbone, HomeView, GameView, EndView ){
    "use strict";

    var _homeView = null;
    var _gameView = null;
    var _endView = null;
    var _eventDispatcher = null;
    var _currentView = null;
    var _controller = null;
    var _model = null;

    return Backbone.Router.extend({
        routes:{ '':'home',  'home':'home',  'game':'game',  'end':'end' },

        initialize:function( controller ){
            _controller = controller;
            _model = _controller.getUserInfo();
            _eventDispatcher = _.extend({}, Backbone.Events );
            this.navigate( 'home', {trigger: true} );
        },

        home:function(){
            if( _currentView ){ _currentView.destory(); }
            if( !_homeView ) {
                var self = this;
                _homeView = new HomeView( { eventDispatcher:_eventDispatcher, model:_model });
                _eventDispatcher.on( 'startup-game', function(){ self.navigate( 'game', {trigger: true} ); });
            }
            else{ _homeView.render(); }
            _currentView = _homeView;
        },

        game:function(){
            if( _currentView ){ _currentView.destory(); }
            if( !_gameView ) {
                var self = this;
                _gameView = new GameView( { eventDispatcher:_eventDispatcher, model:_model });
                _eventDispatcher.on( 'game-end', function(){ _gameView.destory(); self.navigate( 'end', {trigger: true} ); });
            }
            else{ _gameView.render();}
            _currentView = _gameView;
        },

        end:function(){
            var self = this;
            if( _currentView ){ _currentView.destory(); }
            _controller.registScore().done( function( data ){
                if( !_endView ) {
                    _model.set( 'rank', data );
                    var rankLabel;
                    switch( data ){
                        case 1:rankLabel='st'; break;
                        case 2:rankLabel='nd'; break;
                        case 3:rankLabel='rd'; break;
                        default : rankLabel='th'; break;
                    }
                    _model.set( 'rankLabel', rankLabel );
                    _endView = new EndView( { eventDispatcher:_eventDispatcher, model:_model });
                    _eventDispatcher.on( 'restart', function(){ self.navigate( 'game', {trigger: true} ); });
                    _eventDispatcher.on( 'go-home', function(){ self.navigate( 'home', {trigger: true} ); });
                }
                else{ _endView.render();}
                _currentView = _endView;
            });

        }
    });
});
