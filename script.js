'use strict';
// const
const video = document.querySelector('.video__player video');
const mainPlayBtn = document.querySelector('.video__play-icon');
const playBtn = document.querySelector('.video__play-btn');
const volumeBtn = document.querySelector('.video__volume-btn');
const videoProgress = document.querySelector('.video__progress');
const videoInnerProgress = document.querySelector('.video__progress-inner');
const videoVolume = document.querySelector('.video__volume-range');
const videoVolumeInner = document.querySelector('.video__volume-range-inner');
let musePushDown = false;
let volumeMusePushDown = false;

// code
mainPlayBtn.addEventListener('click', play);
playBtn.addEventListener('click', play);
video.addEventListener('click', play);
video.addEventListener('timeupdate', playProgress);
volumeBtn.addEventListener('click', volumeOff);
videoInnerProgress.addEventListener('click', playProgress);
videoProgress.addEventListener('click', changeVideoProgress);
videoProgress.addEventListener('mousemove', mousePushDownMove);
videoProgress.addEventListener('mousedown', () => mousePushDown = true);
videoProgress.addEventListener('mouseup', () => mousePushDown = false);
videoVolume.addEventListener('click', changeVolume);
videoVolume.addEventListener('mousemove', changeVolumeMove);
videoVolume.addEventListener('mousedown', () => volumeMusePushDown = true);
videoVolume.addEventListener('mouseup', () => volumeMusePushDown = false);

// functions
function play() {
    if (video.paused) {
        video.play();
        mainPlayBtn.classList.toggle('inactive');
        playBtn.classList.toggle('inactive');
    } else {
        video.pause();
        mainPlayBtn.classList.toggle('inactive');
        playBtn.classList.toggle('inactive');
    }
};

function playProgress() {
    let range = (video.currentTime / video.duration) * 100;
    videoInnerProgress.style.flexBasis = `${range}%`;    
}

function changeVideoProgress(event) {
    video.currentTime = (event.offsetX / videoProgress.offsetWidth) * video.duration;
}

function mousePushDownMove() {
    if (musePushDown) {
        changeVideoProgress()
    }
}

function volumeOff() {
    if ( !video.volume == 0) {
        volumeBtn.classList.toggle('mute');
        video.volume = 0;
    } else {
        volumeBtn.classList.toggle('mute');
        video.volume = videoVolumeInner.offsetWidth / videoVolume.offsetWidth;
    }   
}

function changeVolume(event) {
    video.volume = (event.offsetX / videoVolume.offsetWidth);
    let volumeRange = (event.offsetX / videoVolume.offsetWidth) * 100;
    videoVolumeInner.style.width = `${volumeRange}%`;
    if (volumeRange < 3) {
        video.volume = 0;
        videoVolumeInner.style.width = 0;
    }

    video.volume == 0 ? volumeBtn.classList.add('mute') : volumeBtn.classList.remove('mute'); 

    console.log(videoVolumeInner.style.width)
}

function changeVolumeMove () {
    if (volumeMusePushDown) {
        changeVolume();
    }
}


