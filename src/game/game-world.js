define( [ 'jquery','game/game-view-model', 'game/game-user-input', 'game/block-item', 'game/game-frame', 'game/game-sound'], function( $, ViewModel, UserInput, BlockItem, GameFrame, SoundManager ){

    'use strict';

    var _pendingBlocks = null;
    var _currentBlock = null;
    var _frame = null;
    var _input = null;
    var _eventDispatcher = null;
    var _$scoreContainer = null;
    var _$pendingBlockList = null;
    var _$pendingBlockItem = null;
    var _addPoint = null;
    var _score = null;
    var _speed = null;
    var _fullCount = null;
    var _gameContext = null;
    var _bgContext = null;
    var _model = null;

    function GameWorld( gameContext, bgContext, eventDispatcher, model ){
        ViewModel.init();
        _gameContext = gameContext;
        _bgContext = bgContext;
        _input = new UserInput( _onInput).on();
        _eventDispatcher = eventDispatcher;
        _$scoreContainer = $('#score-container');
        _$pendingBlockList = $('#block-list');
        _$pendingBlockItem = $('.pending-block');
        _pendingBlocks = [ _createBlock(), _createBlock(),  _createBlock(), _createBlock() ];
        _model = model;
        _addPoint = 20;
        _score = 0;
        _speed = 3;
        _fullCount = 0;
        if( _frame ){ _frame.stop();}
        _frame = new GameFrame( function(){ _moveDown(); }, _speed );
        _frame.run();
        _nextBlock();
        _renderBg();
    }

    GameWorld.prototype = {
        destory:function(){
            _frame.stop();
            _input.off();
        }
    }

    function _addScore( score ){
        _$scoreContainer.text( _score += score );
        if( ++_fullCount % 7 === 0 ){
            _addPoint+=10;
            _speed+=1;
            _frame.setFps(_speed);
        }
    }

    function _nextBlock(){
        _input.reset();
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
            _render();
            return true;
        }else{
            if( _currentBlock.getY() <= 0 ){
                _frame.stop();
                _input.off();
                _close().done( function(){
                    _model.set( 'score', _score );
                    _eventDispatcher.trigger( 'game-end' );
                } );

                return false;
            } else{
                ViewModel.addBlockData( _currentBlock );
                var fullLineCount = ViewModel.testFull();
                if( fullLineCount ){
                    for( var i= 0, count=fullLineCount ; i<count ; i++ ){
                        _addScore( _addPoint );
                    }
                    SoundManager.play( 'clear' );
                }else{
                    SoundManager.play( 'down' );
                }

                _nextBlock();
                _render();
                return false;
            }
        }
    }

    function _close(){
        var d = $.Deferred();
        var mapData = ViewModel.mapData;
        var frame = new GameFrame( function(){
            for( var i= 0, count = mapData.length ; i < count ; i+=1 ){
                if( mapData[ i ] != ViewModel.cellType.die && mapData[ i ] != ViewModel.cellType.empty && mapData[ i ] != ViewModel.cellType.wall ){
                    mapData[ i ] = ViewModel.cellType.die;
                    _addScore( 1 );
                    break;
                }
                if( i === count-1 ){
                    frame.stop();
                    setTimeout( function(){
                        d.resolve();
                    }, 500 );
                }
            }
            _render();
        }, 60);
        frame.run();
        return d.promise();
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

    function _moveLeft(){
        ViewModel.removeBlockData( _currentBlock );
        if( _canLeft( _currentBlock ) ){
            _currentBlock.left();
            ViewModel.addBlockData( _currentBlock );
            _render();
        }
    }

    function _moveRight(){
        ViewModel.removeBlockData( _currentBlock );
        if( _canRight( _currentBlock ) ){
            _currentBlock.right();
            ViewModel.addBlockData( _currentBlock );
            _render();
        }
    }

    function _drop(){
        while( _moveDown() ){}
    }

    function _rotate(){

        ViewModel.removeBlockData( _currentBlock );
        if( _canRotate( _currentBlock ) ){
            SoundManager.play( 'rotate' );
            _currentBlock.rotate();
            ViewModel.addBlockData( _currentBlock );
            _render();
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

    return GameWorld;
});