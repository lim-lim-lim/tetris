
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
        _blockManager = new GameWorld( _render, _end);
        _renderBg();
    }

    function _render(){
        _gameContext.save();
        _gameContext.clearRect( 0, 0, _gameContext.width, _gameContext.height );
        var col,row, x, y;
        var mapData = ViewModel.mapData;
        var cellType = ViewModel.cellType;
        var cellSize = ViewModel.cellSize;
        var type = 0;

        for( var i= 0, count=mapData.length ; i<count ; i+=1 ){
            col = i % ViewModel.col;
            row = Math.floor( i / ViewModel.col );
            type = mapData[ i ];
            x = col*cellSize;
            y = row*cellSize;
            if( type  !== cellType.wall && type  !== cellType.empty ){
                _gameContext.save();
                _gameContext.fillStyle = ViewModel.color[ type ];
                _gameContext.fillRect( x, y, cellSize, cellSize );
                _gameContext.restore();
            }
        }
        //ViewModel.consoleMapData2();
        _bgContext.restore();
    }

    function _renderBg(){
        var col, row, x, y;
        var mapData = ViewModel.mapData;
        var cellType = ViewModel.cellType;
        var cellSize = ViewModel.cellSize
        for( var i= 0, count=mapData.length ; i<count ; i+=1 ){
            col = i % ViewModel.col;
            row = Math.floor( i / ViewModel.col );
            x =  col*cellSize;
            y = row*cellSize;
            if( mapData[ i ]  === cellType.wall ){
                _bgContext.save();
                _bgContext.fillStyle = '#333333';
                _bgContext.fillRect( x, y, cellSize, cellSize );
                _bgContext.restore();
            }else{
                _bgContext.save();
                _bgContext.fillStyle = '#191919';
                _bgContext.strokeStyle = '#222222';
                _bgContext.fillRect( x, y, cellSize, cellSize );
                _bgContext.strokeRect( x, y, cellSize, cellSize );
                _bgContext.restore();
            }
        }
    }

    function _end(){
        TETRIS.GameManager.setScene( 'end' );
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





