( function( TETRIS ){
    var CONST_MAP_DATA = [
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
    ];

    var GameModel = {
        COL_NUM:20,
        CELL_SIZE:20,
        mapData:null,
        initMapData:function(){
          this.mapData = CONST_MAP_DATA.concat();
        },
        getMapData:function(){
            return this.mapData;
        }

    };
    TETRIS.GameModel = GameModel;
}( TETRIS ));


( function( TETRIS ){

    var PRIVATE = {
        start:null,
        now:null,
        intance:null,
        model:null,
        scene:null,
        FPS:1000/24,
        frameHandle:null,
        loop:function loop(){
            PRIVATE.now = Date.now();
            if( PRIVATE.now - PRIVATE.start >= PRIVATE.FPS ){
                PRIVATE.start = Date.now();
                PRIVATE.scene.render( model.mapData );
            }
            this.frameHandle = requestAnimationFrame( loop );
        }
    };

    var PUBLIC = {
        initialize:function(){
            PRIVATE.model.init();
        },
        run:function(){
            PRIVATE.start = Date.now();
            PRIVATE.loop.call( this );

            //game loop
            //scene.render()
        },
        stop:function(){
            cancelRequestAnimationFrame( PRIVATE.frameHandle );
        },
        show: function () {

        },
        hide:function(){

        }
    }

    function GameControl( model, scene ){
        if( !PRIVATE.intance ){
            PRIVATE.intance = this;
            PRIVATE.model = model;
            PRIVATE.scene = scene;
        }
        return PRIVATE.intance;
    }

    GameControl.prototype = PUBLIC;
    TETRIS.GameControl = GameControl;
}( TETRIS ));

( function( TETRIS, Control, Model ){
    function GameSecen( sel, stageSel, bgSel ){
        this.base( sel );
        var $stage = $( stageSel );
        this.stage = $stage[0].getContext( '2d' );
        this.stage.width = $stage.width();
        this.stage.height = $stage.height();
        var $bg = $( bgSel );
        this.bg = $bg[0].getContext( '2d' );
        this.bg.width = $bg.width();
        this.bg.height = $bg.height();
    }

    var PUBLIC = new TETRIS.Scene();
    PUBLIC.base = TETRIS.Scene;

    PUBLIC.initialize = function(){
        PRIVATE.drawBg.call( this );
    };

    PUBLIC.render = function(){
    };

    var PRIVATE = {
        drawBg:function(){
            var col = 0;
            var row = 0;
            var color = 0;
            for( var i= 0, count=this.mapData.length ; i<count ; i+=1 ){
                col = i % Model.COL_NUM;
                row = Math.floor( i / Model.COL_NUM );
                switch ( this.mapData[ i ] ){
                    case 0: color = 'ghostwhite'; break;
                    case 1: color = 'lightblue'; break;
                }
                this.bg.fillStyle = color;
                this.bg.fillRect( col*Model.CELL_SIZE, row*Model.CELL_SIZE, Model.CELL_SIZE, Model.CELL_SIZE );
            }
        }
    };

    GameSecen.prototype = PUBLIC;
    TETRIS.GameSecen = GameSecen;
}( TETRIS, TETRIS.GameControl, TETRIS.GameModel ));
