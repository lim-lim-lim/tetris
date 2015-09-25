var TETRIS = TETRIS || {};
( function( TETRIS ){
    function GameFrame( tick, fps ){
        this.fps = 1000/fps || 1000/24;
        this.tick = tick;
        this.handle = null;
        this.start = null;
        this.now = null;
    }


    GameFrame.prototype = {

        run:function(){
            if( this.start == null ){
                this.start = Date.now();
            }
            this.now = Date.now();
            this.loop();
            if( this.now - this.start >= this.fps ){ this.tick(); }
            this.handle = requestAnimationFrame( this.run );
        },

        stop:function(){
            cancelRequestAnimationFrame( this.handle );
            this.start = null;
            this.now = null;
        }
    }

    TETRIS.GameFrame = GameFrame;

}( TETRIS ));