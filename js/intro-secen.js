var TETRIS = TETRIS || {};

( function( TETRIS, Net ){

    var _instance = null;
    var _$el = null;
    var _control = null;
    var _$startBtn = null;
    var _$rankBtn = null;
    var _$rankList = null;

    function IntroScene( sel, control ){
        if( _instance == null ){
            _instance = this;
            _init( sel );
        }

        return _instance;
    }

    function _init( sel, control ){
        _$el = $( sel );
        _control = control;
        _$rankList = $( '#rank-list' );
        _$startBtn = $( '#start-btn').on( 'click', function(){
            TETRIS.GameManager.setScene( 'game' );
        });
        _$rankBtn = $( '#show-rank').on( 'click', function(){
            _$rankList.toggleClass( 'show' );
        });
    }

    function _updateRankData( data ){
        _$rankList.empty();
        var list = "";

        for( var i=0 ; i<10 ; i+=1 ){
            if( data[ i ]){
                list += "<li class='list-group-item'><span class='badge'>"+data[ i ].SCORE+"</span>"+(i+1)+". "+data[ i ].NAME + "</li>";
            }else{
                list += "<li class='list-group-item'><span class='badge'>0</span>EMPTY</li>";
            }

        }
        _$rankList.html( list );
    }

    IntroScene.prototype = {
        init:function(){
            Net.getRank().done( _updateRankData );
        },
        show:function(){
            _$el.show();
            return this;
        },
        hide:function(){
            _$el.hide();
            return this;
        },
        disable:function(){}
    };


    TETRIS.IntroScene = IntroScene;

}( TETRIS, TETRIS.Net ));



