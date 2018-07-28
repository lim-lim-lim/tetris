
define(function( require ){

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
    ];

    return {
        cellSize:20,
        col:20,
        row:Math.ceil(_constMapData.length/20 ),
        mapData:null,
        color : [ '#ff8080', '#de87cd', '#ffccaa', '#ffdd55', '#5fd3bc', '#afafe9', '#abc837', '#999999' ],
        cellType : {
            die: 7,
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
                if( mapIndex + blockIndex >= 0 ){
                    this.mapData[ mapIndex + blockIndex ] = this.cellType.empty;
                }
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

        testFull:function(){
            var col = 0;
            var row = 0;
            var check = 0;
            var start = 0;
            var end = 0;
            var result = 0;
            for( var i= 0, count = this.mapData.length; i<count ; i+=1 ){
                col = i % this.col;
                row = Math.floor( i / this.col );
                if( row === this.row-1 || row === 0 ){ check=0; continue; }
                if( col === 0 || col === this.col-1 ){ check=0; continue; }
                if( this.mapData[ i ] === this.cellType.empty ){ check=0; continue; }
                if( ++check === this.col-2 ){
                    start = row*this.col;
                    end = start + this.col;
                    for( var j= start; j<end ; j+=1 ){ this.mapData[ j ] = this.cellType.empty; }
                    result++;
                    while( row-- ){
                        start = row*this.col;
                        end = start + this.col;
                        for( var k= start; k<end ; k+=1 ){
                            this.mapData[ k+this.col ] = this.mapData[ k ];
                        }
                    }
                }
            }
            return result;
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
});
