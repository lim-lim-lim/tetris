var TETRIS = TETRIS || {};

( function( TETRIS, Net ){

    var _instance = null;
    var _$el = null;
    var _$gameView = null;
    var _$socreView = null;
    var _$restart = null;
    var _$regist = null;
    var _$registScore = null;
    var _$userName = null;
    var _$goHome = null;

    function EndScene( sel ){
        if( _instance == null ){
            _instance = this;
            _init( sel );
        }
        return _instance;
    }

    function _init( sel ){
        _$el = $( sel );
        _$gameView = $( "#end-view" );
        _$socreView = $( "#user-score" );
        _$restart = $( "#restart" );
        _$regist = $( "#regist" );
        _$registScore = $( "#regist-score" ).hide();
        _$userName = $( "#user-name" );
        _$goHome = $( "#go-home" );

        _$restart.on( "click", function(){ TETRIS.GameManager.setScene('game'); } );
        _$regist.on( "click", function(){ /*invoker.exe( "reg-score", { name:userName.val(), score:score } );*/ } );
        _$goHome.on( "click", function(){TETRIS.GameManager.setScene('intro'); })
    }

    function _checkEntry10( value ){
        Net.entry10( value).done( function(data){
            if( data ){

            }else{

            }
        })
    }

    EndScene.prototype = {
        init:function(){},
        show:function(){
            _$el.show();
            return this;
        },
        hide:function(){
            _$el.hide();
            return this;
        },
        disable:function(){}
    };


    TETRIS.EndScene = EndScene;

}( TETRIS, TETRIS.Net ));



