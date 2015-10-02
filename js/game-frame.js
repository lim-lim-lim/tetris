var TETRIS = TETRIS || {};
( function( TETRIS ){
    function GameFrame( tick, fps ){
        this.fps = 1000/fps || 1000/40;
        this.tick = tick;
        this.handle = null;
        this.start = null;
        this.now = null;

        var self = this;
        this.bindRun = function(){
            self.run();
        };
    }


    GameFrame.prototype = {

        run:function(){
            if( this.start == null ){
                this.start = Date.now();
            }
            this.now = Date.now();
            if( this.now - this.start >= this.fps ){
                this.tick();
                this.start = this.now;
            }
            this.handle = requestAnimationFrame( this.bindRun );
        },

        stop:function(){
            cancelRequestAnimationFrame( this.handle );
            this.start = null;
            this.now = null;
        }
    }

    TETRIS.GameFrame = GameFrame;

}( TETRIS ));