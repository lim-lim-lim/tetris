var TETRIS = TETRIS || {};

( function(TETRIS, ViewModel, BlockItem, UserInput, GameFrame ){

    var _instance = null;
    var _pendingBlocks = null;
    var _currentBlock = null;
    var _frame = null;
    var _onChange = null;
    var _onFull = null;

    function BlockManager( onChange, onFull ){
        if( !_instance ){ _instance = this }
        _onChange = onChange;
        _onFull = onFull;
        return _instance;
    }

    BlockManager.prototype = {
        init:function(){
            _pendingBlocks = [
                _createBlock(),
                _createBlock(),
                _createBlock(),
                _createBlock(),
                _createBlock()
            ];

            if( _frame ){
                _frame.stop();
                _frame = null;
            }

            var self = this;
            _frame = new GameFrame( function(){
                _moveDown();
            }, 1000 );
            _frame.run();
            _nextBlock();
        }
    }

    function _moveDown(){
        ViewModel.removeBlockData( _currentBlock );
        if( _canDown( _currentBlock ) ){
            _currentBlock.down();
            ViewModel.addBlockData( _currentBlock );
            _onChange();
        }else{
            if( _currentBlock.getY() <= 0 ){
                _frame.stop();
                _onFull();

            } else{
                ViewModel.addBlockData( _currentBlock );
                _nextBlock();
                _onChange();
            }
        }

    }

    function _nextBlock(){
        _currentBlock = _pendingBlocks.shift();
        _pendingBlocks.push( _createBlock() );
    }

    function _createBlock(){
        return new BlockItem( Math.round( Math.random()*6) );
    }

    function _canDown( block ){
        return !_isCollision( block.getX(), block.getY()+1, block.getData() )

    }

    function _isCollision( x, y, data){
        if( y <= 0 ) return false;
        var mapData = ViewModel.getMapData();
        var blockData = data;
        var mapIndex = y*ViewModel.col + x;
        var blockIndex = 0;
        var rectX = 0;
        var rectY = 0;
        for( var i= 0 ; i<4 ; i+=1 ){
            rectX = blockData[ i ][ 0 ];
            rectY = blockData[ i ][ 1 ];
            blockIndex = rectY*ViewModel.col + rectX;
            if( mapData[ mapIndex + blockIndex ] !== ViewModel.cellType.empty ){
                return true;
            }
        }
        return false;
    }

    TETRIS.BlockManager = BlockManager;
}(TETRIS, TETRIS.GameViewModel, TETRIS.BlockItem, TETRIS.UserInput, TETRIS.GameFrame ));