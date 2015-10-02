
( function( TETRIS ){

    var _instance = null;
    var _$el = null;
    var _gameContext = null;
    var _bgContext = null;
    var _control = null;
    var _frame = null;
    var _input = TETRIS.UserInput;
    var _viewData = {
        cellSize:20,
        col:20,
        mapData:[
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
            1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
        ],
        cellData : {
            wall : 1
        }
    }

    function GameScene( containerSel, stageSel, bgSel, control ){
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
        _renderBg();
    }

    function _tick(){
        _update();
        _render();
    }

    function _update(){

    }

    function _render(){

    }

    function _renderBg(){
        _bgContext.save();
        _bgContext.fillStyle = '#000000';
        _bgContext.fillRect( 0, 0, _bgContext.width, _bgContext.height );
        var col = 0;
        var row = 0;
        var mapData = _viewData.mapData;
        var cellData = _viewData.cellData;
        var cellSize = _viewData.cellSize
        for( var i= 0, count=mapData.length ; i<count ; i+=1 ){
            col = i % _viewData.col;
            row = Math.floor( i / _viewData.col );
            if( mapData[ i ]  === cellData.wall ){
                console.log( cellSize );
                _bgContext.fillStyle = '#222288';
                _bgContext.fillRect( col*cellSize, row*cellSize, cellSize, cellSize );
            }
        }
        _bgContext.restore();
    }

    GameScene.prototype = {
        init:function(){
            _frame.run();
        },
        show:function(){
            _$el.show();
            return this;
        },
        hide:function(){
            _$el.hide();
            return this;
        },
        disable:function(){

        }
    };


    TETRIS.GameScene = GameScene;

}( TETRIS ));





