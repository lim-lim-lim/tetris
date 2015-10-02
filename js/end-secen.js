
( function( TETRIS ){

    var _instance = null;
    var _$el = null;
    var _control = null;

    function EndScene( sel, control ){
        if( _instance == null ){
            _instance = this;
            _init( sel );
        }

        return _instance;
    }

    function _init( sel, control ){
        _$el = $( sel );
        _control = control;
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

}( TETRIS ));



