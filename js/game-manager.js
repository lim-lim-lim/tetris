var TETRIS = TETRIS || {};
( function( TETRIS ){

    var _control = TETRIS.GameControl;
    var _secenMap = {
        intro: new TETRIS.IntroScene( '#intro-secen', _control).hide(),
        game: new TETRIS.GameScene( '#game-secen', '#game-stage', '#game-bg', _control ).hide(),
        end: new TETRIS.EndScene( '#end-secen', _control ).hide()
    };
    var _currentSecen = null;

    TETRIS.GameManager = {
        setSecen:function( name ){
            if( _currentSecen ){
                _currentSecen.hide();
                _currentSecen.disable();
            }
            _currentSecen = _secenMap[ name ];
            _currentSecen.show();
            _currentSecen.init();
        },
        startup:function(){
            this.setSecen( 'game' );
        }
    };
}( TETRIS ))