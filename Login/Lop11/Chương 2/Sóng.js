window.onload = function () {
    const canvas = document.getElementById('waveCanvas');
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.clientWidth;
    const height = canvas.height = canvas.clientHeight;

    const particles = [];
    const numParticles = 50;
    const offsetX = 50;
    const offsetY = height / 2;

    let amplitude = 50;
    let frequency = 0.7;
    let wavelength = 100;

    for (let i = 0; i < numParticles; i++) {
        particles.push({
            x: (i / numParticles) * (width - offsetX) + offsetX,
            y: offsetY,
            phase: (i / numParticles) * 2 * Math.PI
        });
    }

    function drawAxis() {
        ctx.beginPath();
        ctx.moveTo(offsetX, 0);
        ctx.lineTo(offsetX, height);
        ctx.moveTo(0, offsetY);
        ctx.lineTo(width, offsetY);
        ctx.strokeStyle = 'black';
        ctx.stroke();

        for (let i = offsetX; i < width; i += 50) {
            ctx.moveTo(i, offsetY - 5);
            ctx.lineTo(i, offsetY + 5);
            ctx.stroke();
            ctx.fillText((i - offsetX) / 50 + " m", i, offsetY + 20);
        }

        for (let i = offsetY - amplitude * 2; i <= offsetY + amplitude * 2; i += 50) {
            ctx.moveTo(offsetX - 5, i);
            ctx.lineTo(offsetX + 5, i);
            ctx.stroke();
            ctx.fillText(((offsetY - i) / 50).toFixed(1), offsetX - 20, i + 3);
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, width, height);
        drawAxis();

        particles.forEach((particle, index) => {
            particle.y = amplitude * Math.sin((particle.x / wavelength) * 2 * Math.PI - frequency * Date.now() / 1000) + offsetY;

            ctx.beginPath();
            if (index === Math.floor(numParticles / 2)) {
                ctx.fillStyle = 'red';
            } else {
                ctx.fillStyle = 'white';
            }
            ctx.arc(particle.x, particle.y, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.strokeStyle = 'black';
            ctx.stroke();
        });

        requestAnimationFrame(drawParticles);
    }

    drawParticles();

    document.getElementById('amplitude').addEventListener('input', function () {
        amplitude = this.value;
        document.getElementById('amplitude-value').textContent = this.value;
    });

    document.getElementById('frequency').addEventListener('input', function () {
        frequency = this.value;
        document.getElementById('frequency-value').textContent = this.value;
    });

    document.getElementById('wavelength').addEventListener('input', function () {
        wavelength = this.value;
        document.getElementById('wavelength-value').textContent = this.value;
    });
};

function sendMessage() {
    const nickname = document.getElementById('nickname').value;
    const message = document.getElementById('message').value;
    if (nickname && message) {
        const chatBox = document.getElementById('chat-box');
        const newMessage = document.createElement('div');
        newMessage.textContent = `${nickname}: ${message}`;
        chatBox.appendChild(newMessage);
        document.getElementById('message').value = '';
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

function sendImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const chatBox = document.getElementById('chat-box');
            const newMessage = document.createElement('div');
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '100%';
            newMessage.appendChild(img);
            chatBox.appendChild(newMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
        };
        reader.readAsDataURL(file);
    }
}

function openCamera() {
    const cameraInput = document.createElement('input');
    cameraInput.type = 'file';
    cameraInput.accept = 'image/*';
    cameraInput.capture = 'environment';
    cameraInput.onchange = sendImage;
    cameraInput.click();
}

function openChat() {
    const chatBox = document.getElementById('chat-box');
    chatBox.style.display = chatBox.style.display === 'none' ? 'block' : 'none';
}

let localStream;
let isCameraOn = false;
let isMicOn = false;

async function startMeeting() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        const localVideo = document.getElementById('localVideo');
        localVideo.srcObject = localStream;
        isCameraOn = true;
        isMicOn = true;
    } catch (error) {
        console.error('Error accessing media devices.', error);
    }
}

function toggleCamera() {
    if (localStream) {
        const videoTracks = localStream.getVideoTracks();
        videoTracks.forEach(track => track.enabled = !track.enabled);
        isCameraOn = !isCameraOn;
    }
}

function toggleMic() {
    if (localStream) {
        const audioTracks = localStream.getAudioTracks();
        audioTracks.forEach(track => track.enabled = !track.enabled);
        isMicOn = !isMicOn;
    }
}

function openMeetingInterface() {
    document.getElementById('meeting-interface').classList.add('active');
}

function closeMeetingInterface() {
    document.getElementById('meeting-interface').classList.remove('active');
}

function openChat() {
    window.location.href = "Chat/Chat.html"; 
}

function openMeetingInterface() {
    document.getElementById('meeting-interface').style.display = 'block';
}

function closeMeetingInterface() {
    document.getElementById('meeting-interface').style.display = 'none';
}

function startMeeting() {
}

function toggleCamera() {
}

function toggleMic() {
}

const link1 = document.getElementById("link1");
const link2 = document.getElementById("link2");
const link3 = document.getElementById("link3");

link1.addEventListener('click', () => {
    scrollToElement('Menu_login.html');
});

link2.addEventListener('click', () => {
    scrollToElement('.header', 1);
});

link3.addEventListener('click', () => {
    scrollToElement('.column');
});