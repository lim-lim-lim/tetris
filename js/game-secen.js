var TETRIS = TETRIS || {};
( function( TETRIS ){

    var _instance = null;
    var _$el = null;
    var _control = null;

    function IntroSecen( sel, control ){
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

    IntroSecen.prototype = {
        show:function(){
            _$el.show();
            return this;
        },
        hide:function(){
            _$el.hide();
            return this;
        },
        show:function(){},
        disable:function(){}
    };


    TETRIS.IntroSecen = IntroSecen;

}( TETRIS ));

( function( TETRIS ){

    var _instance = null;
    var _$el = null;
    var _control = null;

    function EndSecen( sel, control ){
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

    EndSecen.prototype = {
        show:function(){
            _$el.show();
            return this;
        },
        hide:function(){
            _$el.hide();
            return this;
        },
        show:function(){},
        disable:function(){}
    };


    TETRIS.EndSecen = EndSecen;

}( TETRIS ));











( function( TETRIS ){

    var _instance = null;
    var _$el = null;
    var _gameContext = null;
    var _bgContext = null;
    var _control = null;
    var _frame = null;

    function GameSecen( containerSel, stageSel, bgSel, control ){
        if( _instance == null ){
            _instance = this;
            _init( containerSel, stageSel, bgSel, control );
        }
        return _instance;
    }

    function _init( containerSel, stageSel, bgSel, control ){
        _$el = $( containerSel );
        var $stage = $( stageSel );
        var width = $stage.width();
        var height = $stage.height();
        _gameContext = $stage[ 0].getContext( '2d' );
        _bgContext = $( bgSel )[ 0].getContext( '2d' );
        _gameContext.width = _bgContext.width = width;
        _gameContext.height = _bgContext.height = height;
        _control = control;
        _frame = new TETRIS.GameFrame( _tick );
    }

    function _tick(){
        _update();
        _render();
    }

    function _update(){

    }

    function _render(){

    }

    GameSecen.prototype = {
        tick:function(){

        },
        show:function(){
            _$el.show();
            return this;
        },
        hide:function(){
            _$el.hide();
            return this;
        },
        show:function(){

        },
        disable:function(){

        }
    };


    TETRIS.GameSecen = GameSecen;

}( TETRIS ));





