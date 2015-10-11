var TETRIS = TETRIS || {};
( function( TETRIS ){

    TETRIS.Net = {
        getRank:function(){
            return $.ajax( {
                url:"php/get-rank.php",
                method:"GET",
                dataType:"json",
            } );
        },

        regRank:function( data ){
            return $.ajax( {
                url:"php/reg-rank.php",
                method:"POST",
                data:data
            } );
        },

        entry10 : function( data ){
            return $.ajax( {
                url:"php/entry10.php",
                method:"GET",
                data:data
            } );
        }
    }

}( TETRIS ));