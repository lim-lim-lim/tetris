define( function(require){

    var ViewModel = require( 'game/game-view-model' );
    var _blockData =
        [
            [
                [[-1,0],[0,0],[1,0],[2,0]],
                [[0,-1],[0,0],[0,1],[0,2]],
                [[-1,0],[0,0],[1,0],[2,0]],
                [[0,-1],[0,0],[0,1],[0,2]]
            ],

            [
                [[0,0],[1,0],[0,-1],[1,-1]],
                [[0,0],[1,0],[0,-1],[1,-1]],
                [[0,0],[1,0],[0,-1],[1,-1]],
                [[0,0],[1,0],[0,-1],[1,-1]]

            ],

            [
                [[-1,-1],[0,-1],[0,0],[1,0]],
                [[1,-1],[0,1],[0,0],[1,0]],
                [[-1,-1],[0,-1],[0,0],[1,0]],
                [[1,-1],[0,1],[0,0],[1,0]]
            ],

            [
                [[-1,0],[0,0],[0,-1],[1,-1]],
                [[0,1],[0,0],[-1,0],[-1,-1]],
                [[-1,0],[0,0],[0,-1],[1,-1]],
                [[0,1],[0,0],[-1,0],[-1,-1]]
            ],

            [
                [[1,-1],[1,0],[0,0],[-1,0]],
                [[1,1],[0,1],[0,0],[0,-1]],
                [[-1,1],[-1,0],[0,0],[1,0]],
                [[-1,-1],[0,-1],[0,0],[0,1]]
            ],

            [
                [[-1,-1],[-1,0],[0,0],[1,0]],
                [[1,-1],[0,-1],[0,0],[0,1]],
                [[1,1],[1,0],[0,0],[-1,0]],
                [[-1,1],[0,1],[0,0],[0,-1]]
            ],

            [
                [[0,-1],[0,0],[-1,0],[1,0]],
                [[0,-1],[0,0],[1,0],[0,1]],
                [[-1,0],[0,0],[1,0],[0,1]],
                [[0,-1],[0,0],[-1,0],[0,1]]
            ]
        ];

    var _startOffsetX = ViewModel.col % 2 === 0 ? -1 : 0;

    function BlockItem( type ){
        this.x = ViewModel.col/2+_startOffsetX;
        this.y = -1;
        this.rotateIndex = 0;
        this.type = type;
        this.data = _blockData[ type ];
    }

    BlockItem.prototype = {
        getX:function(){ return this.x;},
        getY:function(){return this.y;},
        getRotate:function(){return this.rotateIndex;},
        getData:function( rotateIndex ){
            if( rotateIndex === undefined ){ return this.data[ this.rotateIndex ];}
            else{ return this.data[ rotateIndex ]; }
        },
        getType:function(){ return this.type; },
        left:function(){this.x--;},
        right:function(){this.x++;},
        down:function(){this.y++;},
        rotate:function(){this.rotateIndex = ++this.rotateIndex % 4;}
    };

    return BlockItem;
});