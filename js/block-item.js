var TETRIS = TETRIS || {};

( function(TETRIS, ViewModel){

    var _blockData =
    [
        [
            [[-1,0],[0,0],[1,0],[2,0]],

        ],

        [
            [[0,0],[1,0],[0,-1],[1,-1]],
        ],

        [
            [[-1,-1],[0,-1],[0,0],[1,0]],
        ],

        [
            [[-1,0],[0,0],[0,-1],[1,-1]],
        ],

        [
            [[1,-1],[1,0],	[0,0],	[-1,0]],
        ],

        [
            [[-1,-1],[-1,0],[0,0],[1,0]],
        ],

        [
            [[0,-1],[0,0],[-1,0],[1,0]],
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
        getData:function(){ return this.data[ this.rotateIndex ] },
        getType:function(){ return this.type; },
        left:function(){this.x--;},
        right:function(){this.x++;},
        down:function(){
            this.y++;
        },
        rotate:function(){ this.rotateIndex = ++this.rotateIndex % 4;}
    }

    TETRIS.BlockItem = BlockItem;
}(TETRIS, TETRIS.GameViewModel));