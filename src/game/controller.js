

define( [ 'jquery', 'game/model-user-info' ], function( $, UserInfo ){
    var $body = $( 'body' );
    var _userInfo = UserInfo;
    var _loadingState = {
        getRankerList:false
    }

    function _loading(){
        $body.css( 'cursor','wait');
    }

    function _complete(){
        $body.css( 'cursor','auto');
    }

    return {

        getUserInfo:function(){
            return _userInfo;
        },

        getRankerList:function(){
            if( _loadingState.getRankerList  ) return;
            _loading();
            _loadingState.getRankerList = true;
            return $.ajax( {
                url:"php/get-ranker-list.php",
                method:"GET",
                dataType:"json"
            }).always(function(){
                _complete();
                _loadingState.getRankerList = false;
            })
        },

        registScore:function(){
            _loading();
            _userInfo.set( 'name', localStorage.getItem( 'TETRIS-USER-NAME' ) );
            return $.ajax( {
                url:"php/reg-score.php",
                method:"POST",
                data:_userInfo.toJSON()
            }).always(_complete);
        }
    }

});
