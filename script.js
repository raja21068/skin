// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        menuToggle.classList.toggle('toggle');
    });

    // Custom Video Player Controls
    const videos = document.querySelectorAll('.custom-video');

    videos.forEach(video => {
        const controls = video.parentElement.querySelector('.video-controls');
        const playPauseBtn = controls.querySelector('.play-pause');
        const muteUnmuteBtn = controls.querySelector('.mute-unmute');
        const fullscreenBtn = controls.querySelector('.fullscreen');
        const seekBar = controls.querySelector('.seek-bar');
        const volumeBar = controls.querySelector('.volume-bar');
        const timeDisplay = controls.querySelector('.time-display');

        // Play/Pause Toggle
        playPauseBtn.addEventListener('click', () => {
            if (video.paused || video.ended) {
                video.play();
            } else {
                video.pause();
            }
        });

        // Update Play/Pause Button
        video.addEventListener('play', () => {
            playPauseBtn.classList.add('pause');
            playPauseBtn.classList.remove('play');
        });

        video.addEventListener('pause', () => {
            playPauseBtn.classList.add('play');
            playPauseBtn.classList.remove('pause');
        });

        // Mute/Unmute Toggle
        muteUnmuteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
        });

        // Update Mute/Unmute Button
        video.addEventListener('volumechange', () => {
            if (video.muted) {
                muteUnmuteBtn.classList.add('muted');
                muteUnmuteBtn.classList.remove('unmuted');
            } else {
                muteUnmuteBtn.classList.add('unmuted');
                muteUnmuteBtn.classList.remove('muted');
            }
        });

        // Fullscreen Toggle
        fullscreenBtn.addEventListener('click', () => {
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) { /* Safari */
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) { /* IE11 */
                video.msRequestFullscreen();
            }
        });

        // Seek Bar Update
        video.addEventListener('timeupdate', () => {
            const value = (100 / video.duration) * video.currentTime;
            seekBar.value = value;
            updateTimeDisplay();
        });

        seekBar.addEventListener('input', () => {
            const time = video.duration * (seekBar.value / 100);
            video.currentTime = time;
        });

        // Volume Control
        volumeBar.addEventListener('input', () => {
            video.volume = volumeBar.value;
            video.muted = volumeBar.value === '0';
        });

        // Update Time Display
        function updateTimeDisplay() {
            const current = formatTime(video.currentTime);
            const duration = formatTime(video.duration);
            timeDisplay.textContent = `${current} / ${duration}`;
        }

        // Format Time in mm:ss
        function formatTime(time) {
            if (isNaN(time)) {
                return '0:00';
            }
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        }

        // Initialize Time Display
        video.addEventListener('loadedmetadata', updateTimeDisplay);
    });
});
