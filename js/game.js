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
    function GameView( sel, stageSel, bgSel ){
        this.base( sel );
        this.mapData = null;

        var $stage = $( stageSel );
        this.stage = $stage[0].getContext( '2d' );
        this.stage.width = $stage.width();
        this.stage.height = $stage.height();

        var $bg = $( bgSel );
        this.bg = $bg[0].getContext( '2d' );
        this.bg.width = $bg.width();
        this.bg.height = $bg.height();
    }

    var PUBLIC = new TETRIS.View();
    PUBLIC.base = TETRIS.View;

    PUBLIC.initialize = function(){
        this.mapData = CONST.MAP_DATA.concat();
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
                col = i % CONST.COL_NUM;
                row = Math.floor( i / CONST.COL_NUM );
                switch ( this.mapData[ i ] ){
                    case 0: color = 'ghostwhite'; break;
                    case 1: color = 'lightblue'; break;
                }
                this.bg.fillStyle = color;
                this.bg.fillRect( col*CONST.CELL_SIZE, row*CONST.CELL_SIZE, CONST.CELL_SIZE, CONST.CELL_SIZE );
            }
        }
    };

    var CONST = {
        COL_NUM:20,
        CELL_SIZE:20,
        MAP_DATA:[
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
        ]
    };

    GameView.prototype = PUBLIC;
    TETRIS.GameView = GameView;
}());

( function(){
    var Router = {
        viewMap:{
            intro:new TETRIS.View( '#intro-view'),
            game:new TETRIS.GameView( '#game-view', '#game-stage', '#game-bg'),
            end:new TETRIS.View( '#end-view')
        },
        currentView:null,
        go:function( status ){
            if( this.currentView ){ this.currentView.deactive(); }
            this.currentView = this.viewMap[ status ];
            this.currentView.active();
        }
    };

    TETRIS.Router = Router;
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



