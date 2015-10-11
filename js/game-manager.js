var TETRIS = TETRIS || {};

( function( TETRIS ){

    var _secenMap = {
        intro: new TETRIS.IntroScene( '#intro-scene').hide(),
        game: new TETRIS.GameScene( '#game-scene', '#game-stage', '#game-bg' ).hide(),
        end: new TETRIS.EndScene( '#end-scene' ).hide()
    };
    var _currentSecen = null;

    TETRIS.GameManager = {
        setScene:function( name ){
            if( _currentSecen ){
                _currentSecen.hide();
                _currentSecen.disable();
            }
            _currentSecen = _secenMap[ name ];
            _currentSecen.show();
            _currentSecen.init();
        },
        startup:function(){
            this.setScene( 'end' );
        }
    };
}( TETRIS ))