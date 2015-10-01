window.addEventListener("load", function(){
var player = document.getElementById("player");
if(elementExists(player)){
    var controls = document.getElementById("player-controls");
    var fullscreen = false;
    var playButton = document.getElementById("play-pause");
    var muteButton = document.getElementById("mute-unmute");
    var fullScreenButton = document.getElementById("full-screen");
    var timing = document.getElementById("timing");
    var progress = document.getElementById("progress");
    var progressbar = document.getElementById("progress-bar");
    var progressbuf = document.getElementById("progress-buf");
    var progressbtn = document.getElementById("progress-btn");
    var progressupt = function(x){
        x = x - player.offsetLeft;
        newTime = (x / progress.offsetWidth) * video.duration;
        video.currentTime = newTime;
        if (x < 0) {
            newTime = 0;
            video.currentTime = 0;
        } else if (x > progress.offsetWidth) {
            video.currentTime = video.duration;
            newTime = progress.offsetWidth;
        } else {
            newTime = x;
            currentTime = (x / progress.offsetWidth) * video.duration;
            video.currentTime = currentTime;
        }
}
var bufferupt = function(range, time) {
    var len = range.length;
    var index = -1;
    var start = 0;
    var end = 0;
    for (var i = 0; i < len; i++) {
        if (time >= (start = range.start(i)) && time <= (end = range.end(i))) {
            index = i;
            break;
        }
    }
    return end;
};

    var progressdrg = false;
    var timeout;
    var volume = document.getElementById("volume");
    var volumebar = document.getElementById("volume-bar");
    var currentVolume = volumebar.style.width = (video.volume = 0.5 / 1) * volume.offsetWidth + 'px';

    player.onmousemove = function () {
        clearTimeout(timeout);
        if (controls.style.opacity == 0) {
            controls.style.opacity = 0.7;
            video.style.cursor = "pointer";
        } else {
            timeout = setTimeout(function () {
                controls.style.opacity = 0;
                video.style.cursor = "none";
            }, 3000);
        }
    }

    video.addEventListener("play", function () {
            playButton.className = "control-buttons pause";
    });
    video.addEventListener("click", function () {
        if (video.paused == true) {
            video.play();
            playButton.className = "control-buttons pause";
        } else {
            video.pause();
            playButton.className = "control-buttons play";
        }
    });

    playButton.addEventListener("click", function () {
        if (video.paused == true) {
            video.play();
            playButton.className = "control-buttons pause";
        } else {
            video.pause();
            playButton.className = "control-buttons play";
        }
    });

    video.addEventListener("ended", function () {
        playButton.className = "control-buttons replay";
        timing.textContent = secondstotime(video.currentTime = 0) + ' / ' + secondstotime(video.duration);
        video.pause();
    });

    muteButton.addEventListener("click", function () {
        if (video.muted === false) {
            video.muted = true;
            muteButton.className = "control-buttons unmute";
        } else {
            video.muted = false;
            muteButton.className = "control-buttons mute";
        }
    });

    fullScreenButton.addEventListener("click", function () {
        if (fullscreen == false) {
            fullscreen = true;
            fullScreenButton.className = "control-buttons small-screen";
            if (player.requestFullscreen) {
                player.requestFullscreen();
            } else if (player.mozRequestFullScreen) {
                player.mozRequestFullScreen(); // Firefox
            } else if (player.webkitRequestFullscreen) {
                player.webkitRequestFullscreen(); // Chrome and Safari
            } else if (player.msRequestFullscreen) {
                player.msRequestFullscreen();
            } else {
                player.className += " full_screen";
            }
        } else {
            fullscreen = false;
            fullScreenButton.className = "control-buttons full-screen";
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen(); // Firefox
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen(); // Chrome and Safari
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen(); //Internet Explorer;
            } else {
                player.className = "player";
            }
        }
    });

    // Event listener for the seek bar
    progress.addEventListener("mousedown", function (e) {
        progressdrg = true;
        video.paused = true;
        progressupt(e.pageX);
    });

    document.addEventListener("mouseup", function (e) {
        progressdrg = false;
        video.paused = false;
    });

    document.addEventListener("mousemove", function (e) {
        if(progressdrg == true){
        progressupt(e.pageX);
        }
    });

    video.addEventListener("timeupdate", function () {
        pastTime = (video.currentTime / video.duration) * progress.offsetWidth;
        bufferTime = bufferupt (video.buffered, video.currentTime) / video.duration * progress.offsetWidth - progress.offsetLeft;
        timing.textContent = secondstotime(video.currentTime) + ' / ' + secondstotime(video.duration);
        progressbar.style.width = pastTime + 'px';
        progressbuf.style.width = bufferTime + 'px';
        progressbtn.style.left = pastTime - (progressbtn.clientWidth / 2) + 'px';
    });

    volume.addEventListener("mousedown", function (e) {
        x = e.pageX - player.offsetLeft - volume.offsetLeft;
        newVolume = (x / volume.offsetWidth) * 1;
        if (newVolume >= 0.95) {
            newVolume = 1;
        }
        video.volume = newVolume;
        currentVolume = (video.volume / 1) * volume.offsetWidth;
        volumebar.style.width = currentVolume + 'px';
    });
}
},false);
