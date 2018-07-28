

require.config({
    baseUrl:'./src/lib',
    paths:{
        game: '../game',
        tpl: '../tpl',
        lib: '../lib'
    },
    shim:{
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});


require(['jquery', 'backbone', 'game/router', 'game/controller', 'game/game-sound' ], function ($, Backbone, Router, Controller, SoundManager) {
    setTimeout( function(){
        SoundManager.load().done( function(){
            var router = new Router( Controller );
            Backbone.history.start();
            SoundManager.play( 'bgm' );
        });
    }, 1000)

});