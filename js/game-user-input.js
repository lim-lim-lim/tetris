var TETRIS = TETRIS || {};

( function( TETRIS, GameFrame ){

    var _instace = null;
    var _$doc = $( document );
    var _keyMap = { left:false, top:false, right:false, bottom:false };
    var _frame = null;
    var _input = false;

    function UserInput( onInput  ){
        this.onInput = onInput;
        if( !_instace ){
            _instace = this;
            var self = this;
            _frame = new GameFrame( function(){
                if( _input ){
                    self.onInput( _keyMap );
                    _input = false;
                }
            },40);
        }
        return _instace
    }
    UserInput.prototype = {
        on:function(){
            var self = this;
            this.off();
            _$doc.on( 'keydown', function( event ){
                switch( event.keyCode ){
                    case 37: _keyMap.left=true; _input = true; break;
                    case 38: _keyMap.top=true; _input = true; break;
                    case 39: _keyMap.right=true; _input = true; break;
                    case 40: _keyMap.bottom=true; _input = true; break;
                }
            });

            _$doc.on( 'keyup', function( event ){
                switch( event.keyCode ){
                    case 37: _keyMap.left=false; break;
                    case 38: _keyMap.top=false; break;
                    case 39: _keyMap.right=false; break;
                    case 40: _keyMap.bottom=false; break;
                }
            });
        },

        off:function(){
            _$doc.off( 'keydown' );
            _$doc.off( 'keyup' );
        }
    };

    TETRIS.UserInput = UserInput;

}( TETRIS, TETRIS.GameFrame ));