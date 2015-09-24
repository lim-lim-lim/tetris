var TETRIS = {};

( function(){
    function View( sel ){
        this.$el = $( sel );
    }

    var PUBLIC = {
        active:function(){
            this.$el.fadeIn();
            this.initialize();
        },

        deactive:function(){
            this.$el.fadeOut();
        },

        initialize:function(){

        }
    };

    View.prototype = PUBLIC;
    TETRIS.View = View;
}());

( function(){

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
        MAP_DATA : null,
        initMapData:function(){
          this.MAP_DATA = CONST_MAP_DATA.concat();
        },
        getMapData:function(){
            return this.MAP_DATA.concat();
        }

    };
    TETRIS.GameModel = GameModel;
}());

( function(){
    var GameCommand = {
        execute:function(){},
        deactive:function(){}
    };

    window.GameCommand = GameCommand;
}());

( function( Model ){
    function GameView( sel, stageSel, bgSel ){
        this.base( sel );
        var $stage = $( stageSel );
        this.stage = $stage[0].getContext( '2d' );
        this.stage.width = $stage.width();
        this.stage.height = $stage.height();
        var $bg = $( bgSel );
        this.bg = $bg[0].getContext( '2d' );
        this.bg.width = $bg.width();
        this.bg.height = $bg.height();
        Model.initMapData();
    }

    var PUBLIC = new TETRIS.View();
    PUBLIC.base = TETRIS.View;

    PUBLIC.initialize = function(){
        this.mapData = Model.getMapData();
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

    GameView.prototype = PUBLIC;
    TETRIS.GameView = GameView;
}( TETRIS.GameModel ));


( function(){
    var GameInvoke = {
        commands:{
            intro: null,
            game: new TETRIS.GameCommand(),
            //game:new TETRIS.GameView( '#game-view', '#game-stage', '#game-bg'),
            end: null
        },
        currentCommand:null,
        exe:function( status ){
            if( this.currentCommand ){ this.currentCommand.deactive(); }
            this.currentCommand = this.commands[ status ];
            this.currentCommand.execute();
        }
    };

    TETRIS.GameInvoke = GameInvoke;
}());




( function(){
    var Assets = {

    }

    var PRIVATE = {
        loadSprite:function(){
            //return promise
        },
        loadBGM:function(){
            //return promise
        },
        loadEffSnd:function(){
            //return promise
        }
    }
}());



