define( function( require ){
    var GameFrame = require( 'game/game-frame' );
    var _instace = null;
    var _$doc = $( document );
    var _keyMap = { left:false, up:false, right:false, down:false, space:false };
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
            },40).run();
        }
        return _instace
    }
    UserInput.prototype = {
        on:function(){
            var self = this;
            this.off();
            _$doc.on( 'keydown', function( event ){
                switch( event.keyCode ){
                    case 32: _keyMap.space=true; _input = true; break;
                    case 37: _keyMap.left=true; _input = true; break;
                    case 38: _keyMap.up=true; _input = true; break;
                    case 39: _keyMap.right=true; _input = true; break;
                    case 40: _keyMap.down=true; _input = true; break;
                }
            });

            _$doc.on( 'keyup', function( event ){
                switch( event.keyCode ){
                    case 32: _keyMap.space=false; break;
                    case 37: _keyMap.left=false; break;
                    case 38: _keyMap.up=false; break;
                    case 39: _keyMap.right=false; break;
                    case 40: _keyMap.down=false; break;
                }
            });

            return this;
        },

        off:function(){
            _$doc.off( 'keydown' );
            _$doc.off( 'keyup' );
            this.reset();
            return this;
        },

        reset:function(){
            _keyMap = { left:false, up:false, right:false, down:false, space:false };
        }
    };

    return UserInput;
});