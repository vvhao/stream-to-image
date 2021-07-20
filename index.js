function $(elem) {
    return document.querySelector(elem);
}

function convertBase64UrlToBlob(urlData) {
    const arr = urlData.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

const canvas = $('canvas');
const context = canvas.getContext('2d');
const video = $('video');
const snap = $('#snap');
const close = $('#close');
const upload = $('#upload');
const image = $('#image');

navigator.mediaDevices.getDisplayMedia({
    video: true,
    audio: false
}).then(function (stream) {
    const mediaStreamTrack = stream.getVideoTracks();
    video.srcObject = new MediaStream(mediaStreamTrack);
    video.play();
}).catch(function (err) {
    console.log(err);
});

snap.addEventListener('click', function () {
    context.drawImage(video, 0, 0, 240, 135);
}, false);

upload.addEventListener('click', function () {
    const base64 = canvas.toDataURL('image/png');
    const blob = convertBase64UrlToBlob(base64);
    image.src = base64;
    console.log(base64);
    console.log(blob);
    console.log(URL.createObjectURL(blob));
}, false);