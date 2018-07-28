define( [ 'jquery' ],function( $ ){

    var _soundMap = {};
    var _path = 'assets/snd/'
    var _soundList = [
        {name:'bgm', path:_path+'bgm.mp3', loop:true },
        {name:'down', path:_path+'down.mp3' },
        {name:'rotate', path:_path+'rotate.mp3' },
        {name:'clear', path:_path+'clear.mp3' }
    ];

    return {
        load:function(){
            var loadcount = 0;
            var d = $.Deferred();
            for( var i= 0, count=_soundList.length ; i<count ; i+=1 ){
                var snd = new Audio();
                snd.src = _soundList[ i].path;
                snd.name = _soundList[ i].name;
                snd.load();
                if( _soundList[ i].loop ){
                    snd.loop = true;
                    snd.addEventListener( 'ended', function( event ){
                       this.currentTime = 0;
                       this.play();
                    });
                }

                snd.addEventListener( 'loadeddata', function( event ){
                   _soundMap[ this.name ] = this;
                    loadcount++;
                    if( loadcount == _soundList.length ){
                        d.resolve();
                    }
                });
            }
            return d.promise();
        },

        play:function( type ){
            _soundMap[ type].currentTime = 0;
            _soundMap[ type].play();
        }
    }
});