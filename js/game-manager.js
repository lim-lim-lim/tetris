var TETRIS = TETRIS || {};
( function( TETRIS ){

    var _instance = null;
    var _control = new TETRIS.GameControl();
    var _secenMap = {
        intro: new TETRIS.IntroSecen( '#intro-secen', _control).hide(),
        game: new TETRIS.GameSecen( '#game-secen', '#game-stage', '#game-bg', _control ).hide(),
        end: new TETRIS.EndSecen( '#end-secen', _control ).hide()
    };
    var _currentSecen = null;

    function GameManager(){
        if( _instance == null ) _instance = this;
        return _instance;
    }

    GameManager.prototype = {
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
    }

    TETRIS.GameManager = GameManager;
}( TETRIS ))