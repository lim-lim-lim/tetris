var TETRIS = TETRIS || {};
( function( TETRIS ){


    var _constMapData = [
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,9,
        9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9
    ]

    TETRIS.GameViewModel = {
        cellSize:20,
        col:20,
        mapData:null,
        color : [ 'red', 'blue', 'violet', 'orange', 'yellow', 'aliceblue', 'green'],
        cellType : {
            empty: 8,
            wall : 9
        },
        init:function(){
            this.mapData = _constMapData.concat();
        },
        getMapData:function(){
            return this.mapData;
        },
        removeBlockData:function( block ){
            var blockData = block.getData();
            var x = block.getX();
            var y = block.getY();
            var mapIndex = y*this.col + x;
            var blockIndex = 0;
            var rectX = 0;
            var rectY = 0;
            for( var i = 0 ; i<4 ; i+=1 ){
                rectX = blockData[ i ][ 0 ];
                rectY = blockData[ i ][ 1 ];
                blockIndex = rectY*this.col + rectX;
                this.mapData[ mapIndex + blockIndex ] = this.cellType.empty;
            }
        },
        addBlockData:function( block ){
            var blockData = block.getData();
            var x = block.getX();
            var y = block.getY();
            var mapIndex = y*this.col + x;
            var blockIndex = 0;
            var rectX = 0;
            var rectY = 0;
            var type  = block.getType();
            for( var i = 0 ; i<4 ; i+=1 ){
                rectX = blockData[ i ][ 0 ];
                rectY = blockData[ i ][ 1 ];
                blockIndex = rectY*this.col + rectX;
                if( mapIndex + blockIndex > 0 ){
                    this.mapData[ mapIndex + blockIndex ] = type;
                }
            }
        },
        consoleMapData:function(){
            var data = '';
            for( var i= 0, count=this.mapData.length ; i<count ; i+=1 ){
                if( i % this.col === 0 ){ data += '\n' }
                if( this.mapData[ i ] == this.cellType.empty  ){ data += '0'; }
                else if( this.mapData[ i ] == this.cellType.wall  ){ data += '*'; }
                else{ data += '#';}

            }
            console.log( data );
        },
        consoleMapData2:function(){
            var data = '';
            for( var i= 0, count=this.mapData.length ; i<count ; i+=1 ){
                if( i % this.col === 0 ){ data += '\n' }
                data += this.mapData[ i ];
            }
            console.log( data );
        }
    };

    TETRIS.GameViewModel.init();

}( TETRIS ));