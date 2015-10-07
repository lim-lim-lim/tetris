var TETRIS = TETRIS || {};

( function(TETRIS, ViewModel, BlockItem, UserInput, GameFrame ){

    var _instance = null;
    var _pendingBlocks = null;
    var _currentBlock = null;
    var _frame = null;
    var _input = null;
    var _onChange = null;
    var _onEnd = null;
    var _$pendingBlockList = $('#block-list');
    var _$pendingBlockItem = $('.pending-block');
    var _$scoreContainer = $('#score-container');
    var _addPoint = 10;
    var _score = 0;
    var _speed = 1;
    var _fullCount = 0;

    function GameWorld( onChange, onEnd ){
        if( !_instance ){ _instance = this }
        _onChange = onChange;
        _onEnd = onEnd;

        _input = new UserInput( _onInput).on();
        return _instance;
    }

    GameWorld.prototype = {
        init:function(){
            _pendingBlocks = [ _createBlock(), _createBlock(),  _createBlock(), _createBlock() ];
            _addPoint = 10;
            _score = 0;
            _speed = 1;
            _fullCount = 0;
            if( _frame ){
                _frame.stop();
                _frame = null;
            }
            _frame = new GameFrame( function(){ _moveDown(); }, _speed );
            _frame.run();
            _nextBlock();
        }
    }

    function _addScore(){
        _$scoreContainer.text( _score += _addPoint );
        if( ++_fullCount % 7 === 0 ){
            _addPoint+=5;
            _speed+=1;
            _frame.setFps(_speed);
        }
    }

    function _nextBlock(){
        if( !_currentBlock ){
            _currentBlock = _pendingBlocks.shift();
            _pendingBlocks.push( _createBlock() );
            _$pendingBlockItem.each( function(i, item){
                var type = _pendingBlocks[ i].getType();
                $( item).css( 'background-position', '0px '+ (-100*type) +'px' )
            });
        }else{
            _currentBlock = _pendingBlocks.shift();
            _pendingBlocks.push( _createBlock() );
            _$pendingBlockList.stop().animate( { top:-100},150,function(){
                _$pendingBlockList.css( 'top', 0  );
                _$pendingBlockItem.each( function(i, item){
                    var type = _pendingBlocks[ i].getType();
                    console.log( type, 100*type );
                    $( item).css( 'background-position', '0px '+ (-100*type) +'px' )
                });
            });
        }
    }

    function _createBlock(){
        return new BlockItem( Math.floor( Math.random()*7-1)+1  );
    }

    function _moveDown(){
        ViewModel.removeBlockData( _currentBlock );
        if( _canDown( _currentBlock ) ){
            _currentBlock.down();
            ViewModel.addBlockData( _currentBlock );
            _onChange();
            return true;
        }else{
            if( _currentBlock.getY() <= 0 ){
                _frame.stop();
                _onEnd();
                return false;
            } else{
                ViewModel.addBlockData( _currentBlock );
                for( var i= 0, count=ViewModel.testFull() ; i<count ; i++ ){
                    _addScore();
                }
                _nextBlock();
                _onChange();
                return false;
            }
        }
    }

    function _moveLeft(){
        ViewModel.removeBlockData( _currentBlock );
        if( _canLeft( _currentBlock ) ){
            _currentBlock.left();
            ViewModel.addBlockData( _currentBlock );
            _onChange();
        }
    }

    function _moveRight(){
        ViewModel.removeBlockData( _currentBlock );
        if( _canRight( _currentBlock ) ){
            _currentBlock.right();
            ViewModel.addBlockData( _currentBlock );
            _onChange();
        }
    }

    function _drop(){
        while( _moveDown() ){}
    }

    function _rotate(){
        ViewModel.removeBlockData( _currentBlock );
        if( _canRotate( _currentBlock ) ){
            _currentBlock.rotate();
            ViewModel.addBlockData( _currentBlock );
            _onChange();
        }
    }

    function _canDown( block ){ return !_isCollision( block.getX(), block.getY()+1, block.getData() );}
    function _canLeft( block ){ return !_isCollision( block.getX()-1, block.getY(), block.getData() ); }
    function _canRight( block ){ return !_isCollision( block.getX()+1, block.getY(), block.getData() ); }
    function _canRotate( block ){ return !_isCollision( block.getX(), block.getY(), block.getData( (block.getRotate()+1)%4 ) );}
    function _isCollision( x, y, data){
        if( y == -1 ) return true;
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
            if( mapIndex + blockIndex < 0 ){ continue; }
            if( mapData[ mapIndex + blockIndex ] !== ViewModel.cellType.empty ){
                return true;
            }
        }
        return false;
    }

    function _onInput( keyMap ){
        ViewModel.removeBlockData( _currentBlock );
        if( keyMap.left ){ _moveLeft(); }
        if( keyMap.right ){ _moveRight(); }
        if( keyMap.down ){ _moveDown(); }
        if( keyMap.up ){ _rotate(); }
        if( keyMap.space ){if( _currentBlock.getY() > -1 ){ _drop(); }}
    }

    TETRIS.GameWorld = GameWorld;
}(TETRIS, TETRIS.GameViewModel, TETRIS.BlockItem, TETRIS.UserInput, TETRIS.GameFrame ));