const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
	navigator.mediaDevices.getUserMedia({video: true, audio: false}).
		then(localMediaStream => {
			console.log(localMediaStream)
			video.src = window.URL.createObjectURL(localMediaStream);
			video.play();
		})
		.catch(err => console.log(`OH NO!!!`, err));
}

function paintToCanvas(){
	const {videoWidth: width, videoHeight: height} = video;
	canvas.width = width;
	canvas.height = height;

	setInterval(()=>{
		ctx.drawImage(video, 0, 0, width, height);
		//take pixels out
		let pixels = ctx.getImageData(0, 0, width, height);
		pixels = rgbSplit(pixels);
		//put them back
		ctx.putImageData(pixels, 0, 0);
	}, 16);

}

function redEffect(pixels){
	for(let i = 0; i < pixels.data.length; i+=4){
		pixels.data[i] = pixels.data[i] + 100; //red
		pixels.data[i+1] = pixels.data[i+1] - 50; //green
		pixels.data[i+2] = pixels.data[i+2] * 0.5; //blue
	}
	return pixels;
}


function rgbSplit(pixels){

	for(let i = 0; i < pixels.data.length; i+= 4){
		pixels.data[i-150] = pixels.data[i];
		pixels.data[i+500] = pixels.data[i+1];
		pixels.data[i-550] = pixels.data[i+2];
	}

	return pixels;
}



function takePhoto(){
//play the sound
	snap.currentTime = 0;
	snap.play();

//take the data out of the canvas

	const data = canvas.toDataURL('image/jpeg');//converts to base64
	const link = document.createElement('a');
	link.href = data;
	link.setAttribute('download', 'handsome');
	link.textContent = 'Download Image';
	link.innerHTML = `<img src="${data}" alt="${data}">`;
	strip.insertBefore(link, strip.firstChild);



}

// getVideo();

video.addEventListener('canplay', paintToCanvas);