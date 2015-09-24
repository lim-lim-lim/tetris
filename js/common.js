TETRIS = {};
( function(){
    function Scene( sel ){
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

    Scene.prototype = PUBLIC;
    TETRIS.Scene = Scene;
}());

(function(){
    var SceneManager
}());