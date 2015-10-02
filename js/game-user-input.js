var TETRIS = TETRIS || {};
( function( TETRIS ){

    var _$doc = $( document );

    TETRIS.UserInput = {
        keyMap:{ left:false, top:false, right:false, bottom:false },
        on:function(){
            var self = this;
            _$doc.on( 'keydown', function( event ){
                switch( event.keyCode ){
                    case 37: self.keyMap.left=true; break;
                    case 38: self.keyMap.top=true; break;
                    case 39: self.keyMap.right=true; break;
                    case 40: self.keyMap.bottom=true; break;
                }
            });

            _$doc.on( 'keyup', function( event ){
                switch( event.keyCode ){
                    case 37: self.keyMap.left=false; break;
                    case 38: self.keyMap.top=false; break;
                    case 39: self.keyMap.right=false; break;
                    case 40: self.keyMap.bottom=false; break;
                }
            });
        },

        off:function(){
            _$doc.off( 'keydown' );
            _$doc.off( 'keyup' );
        }
    };

}( TETRIS ));