var TETRIS = TETRIS || {};

( function( TETRIS ){
    function GameFrame( tick, fps ){
        this.fps = 1000/fps || 1000/40;
        this.tick = tick;
        this.handle = null;
        this.start = null;
        this.now = null;
        this.isStop = true;
        var self = this;
        this.bindRun = function(){
            if( !self.isStop ){ self.run();}
        };
    }


    GameFrame.prototype = {

        run:function(){
            this.isStop = false;
            if( this.start == null ){
                this.start = Date.now();
            }
            this.now = Date.now();
            if( this.now - this.start >= this.fps ){
                this.tick();
                this.start = this.now;
            }
            this.handle = window.requestAnimationFrame( this.bindRun );
        },

        stop:function(){
            this.isStop = true;
            window.cancelAnimationFrame( this.handle );
            this.start = null;
            this.now = null;
        }
    }

    TETRIS.GameFrame = GameFrame;

}( TETRIS ));