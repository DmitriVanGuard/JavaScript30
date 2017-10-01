/* GET ELEMENTS */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.player__button_fullscreen');

/* BUILD FUNCTIONS */
function togglePlay(){
	const method = video.paused ? 'play' : 'pause';
	video[method]();
}

function updateButton(){
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
}

function skip(){
	const amount = this.getAttribute('data-skip'); //Amount is a string!
	video.currentTime += parseFloat(amount);
}

function handleRangeUpdate(){
	video[this.name] = this.value;
}

function handleProgress(){
	const percent = (video.currentTime / video.duration) * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
	const videoClickTime = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = videoClickTime;
}

function handleFullscreen(){
	video.webkitDisplayingFullscreen ? video.webkitExitFullscreen() : video.webkitRequestFullscreen();
}
/* HOOK UP THE EVENTS*/

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

skipButtons.forEach(item => item.addEventListener('click', skip));
ranges.forEach(item => item.addEventListener('change', handleRangeUpdate));

video.addEventListener('timeupdate', handleProgress);

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousedown', ()=> mousedown = true);
progress.addEventListener('mouseup', ()=> mousedown = false);
progress.addEventListener('mousemove', (e)=> mousedown && scrub(e));

fullScreen.addEventListener('click', handleFullscreen);