
( function( TETRIS, ViewModel, GameWorld  ){

    var _instance = null;
    var _$el = null;
    var _gameContext = null;
    var _bgContext = null;
    var _blockManager = null;

    function GameScene( containerSel, stageSel, bgSel ){
        if( _instance == null ){
            _instance = this;
            _init( containerSel, stageSel, bgSel );
        }
        return _instance;
    }

    function _init( containerSel, stageSel, bgSel ){
        _$el = $( containerSel );
        var $stage = $( stageSel );
        var width = $stage.width();
        var height = $stage.height();
        _gameContext = $stage[ 0].getContext( '2d' );
        _bgContext = $( bgSel )[ 0].getContext( '2d' );
        _gameContext.width = _bgContext.width = width;
        _gameContext.height = _bgContext.height = height;
        _blockManager = new GameWorld( _render, _end );
        _renderBg();
    }

    function _render(){
        _gameContext.save();
        _gameContext.clearRect( 0, 0, _gameContext.width, _gameContext.height );
        var col = 0;
        var row = 0;
        var mapData = ViewModel.mapData;
        var cellType = ViewModel.cellType;
        var cellSize = ViewModel.cellSize;
        var type = 0;

        for( var i= 0, count=mapData.length ; i<count ; i+=1 ){
            col = i % ViewModel.col;
            row = Math.floor( i / ViewModel.col );
            type = mapData[ i ];
            if( type  !== cellType.wall && type  !== cellType.empty ){
                _gameContext.fillStyle = ViewModel.color[ type ];
                _gameContext.fillRect( col*cellSize, row*cellSize, cellSize, cellSize );
            }
        }
        //ViewModel.consoleMapData2();
        _bgContext.restore();
    }

    function _renderBg(){
        _bgContext.save();
        _bgContext.fillStyle = '#000000';
        _bgContext.fillRect( 0, 0, _bgContext.width, _bgContext.height );
        var col = 0;
        var row = 0;
        var mapData = ViewModel.mapData;
        var cellType = ViewModel.cellType;
        var cellSize = ViewModel.cellSize
        for( var i= 0, count=mapData.length ; i<count ; i+=1 ){
            col = i % ViewModel.col;
            row = Math.floor( i / ViewModel.col );
            if( mapData[ i ]  === cellType.wall ){
                _bgContext.fillStyle = '#222288';
                _bgContext.fillRect( col*cellSize, row*cellSize, cellSize, cellSize );
            }
        }
        _bgContext.restore();
    }

    function _end(){
        console.log( "game over");
        //alert( 'game over')
    }

    GameScene.prototype = {
        init:function(){
            ViewModel.init();
            _blockManager.init();
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

}( TETRIS, TETRIS.GameViewModel, TETRIS.GameWorld, TETRIS.GameFrame ));





