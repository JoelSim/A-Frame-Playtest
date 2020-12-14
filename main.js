/// Variables
var isVideoLoaded = false;
var isSoundLoaded = false;
var firstTouch = true;
var bigSize = false;
var bigSize2 = false;

/// References
var aSound = null;
var audio = null;
var video = null;
var text = null;

AFRAME.registerComponent('loadassets', {
    init() {
        loadButton();
    },

    tick() {

    },
});

function loadButton() {
    var button1 = document.querySelector('#button1');
    var button2 = document.querySelector('#button2');
    var camera = document.querySelector('#cam');

    button1.addEventListener('click', function (evt) {
        console.log('I was clicked at: ', evt.detail.intersection.point);
        if (bigSize) {
            button1.setAttribute('scale', { x: 1, y: 1, z: 1 });
            bigSize = false;
        } else {
            button1.setAttribute('scale', { x: 2, y: 2, z: 2 });
            bigSize = true;
        }
        camera.setAttribute('animation__pos', { startEvents: true });
    });

    button2.addEventListener('click', function (evt) {
        console.log('I was clicked at: ', evt.detail.intersection.point);

        // anime({
        //     targets: camera,
        //     duration: 2000,
        // });
    });
}

function loadInput() {
    window.addEventListener('touchstart', function () {
        if (firstTouch) {
            loadSound();
        }
    });
}

function loadText() {
    text = document.querySelector('[text]');
    text.setAttribute('text', { value: 'Touch anywhere to load and play sound' });
}

function loadSound() {
    //#region THIS IS WHEN USING HOWLER AUDIO FRAMEWORK, NO 3D SURROUND SOUND
    firstTouch = false;
    var sound = new Howl({
        src: ['./Assets/music.mp3']
    });
    text.setAttribute('text', { value: 'Sound loading...' });


    Howler.volume(0.2);
    sound.on("load", function () {
        isSoundLoaded = true;
        console.log("sound loaded: " + isSoundLoaded);
        sound.play();
        text.setAttribute('text', { value: 'Sound loaded and playing' });
    });

    sound.on("loaderror", function () {
        console.log("sound loaded: " + isSoundLoaded);
        text.setAttribute('text', { value: 'Sound load error' });
    })
    //#endregion

    // firstTouch = false;
    // audio = document.querySelector('audio');
    // aSound = document.querySelector('[sound]');
    // audio.load();
    // text.setAttribute('text', {value: 'Sound loading...'});

    // var interval = setInterval(() => {
    //   if (audio.readyState >= 4) { /// finish loading the audio
    //     clearInterval(interval);
    //     isSoundLoaded = true;
    //     console.log("sound loaded: " + isSoundLoaded);
    //     text.setAttribute('text', {value: 'Sound loaded and playing'});
    //     aSound.components.sound.stopSound();
    //     aSound.components.sound.playSound();
    //   }
    // }, 500);

    // aSound.addEventListener('sound-loaded', function (event) {
    //   isSoundLoaded = true;
    //   console.log("sound loaded: " + isSoundLoaded);
    //   text.setAttribute('text', {value: 'Sound loaded and playing'});
    //   aSound.components.sound.stopSound();
    //   aSound.components.sound.playSound();
    // });
}

function loadVideo() {
    firstTouch = false;
    video = document.querySelector('video');
    video.load();
    text.setAttribute('text', { value: 'Video loading...' });
    var interval = setInterval(() => {
        if (video.readyState >= 4) { /// finish loading the video
            clearInterval(interval);
            isVideoLoaded = true;
            console.log("video loaded: " + isVideoLoaded);
            text.setAttribute('text', { value: 'Video loaded and playing' });
            playVideo();
        }
    }, 500);
}

function playVideo() {
    if (isVideoLoaded) {
        //text.setAttribute('text', {opacity: 0});
        //sound.components.sound.stopSound();
        //sound.components.sound.playSound();
        if (video.muted) {
            video.muted = !video.muted;
        }
        video.play();
        console.log("Play now");
    }
}