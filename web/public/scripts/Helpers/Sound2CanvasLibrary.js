import _ from 'lodash'
import 'Libs/Adapter'
import USER_MEDIA from 'Helpers/UserMedia'
import AUDIO_CONTEXT from 'Helpers/AudioContext'

export default class Sound2CanvasLibrary {
    constructor (canvas, visualizationType, extraParams) {
        Object.assign(this, {
            canvas,
            context: canvas.getContext("2d"),
            visualizationType
        }, extraParams);
        this.getMedia();
    }

    getMedia () {
        USER_MEDIA
            .then((stream) => {
                this.analyser = AUDIO_CONTEXT.createAnalyser();
                // this.distortion = AUDIO_CONTEXT.createWaveShaper();
                // this.gainNode = AUDIO_CONTEXT.createGain();
                // this.biquadFilter = AUDIO_CONTEXT.createBiquadFilter();

                this.source = AUDIO_CONTEXT.createMediaStreamSource(stream);
                this.source.connect(this.analyser);
                // this.analyser.connect(this.distortion);
                // this.analyser.minDecibels = -90;
                // this.analyser.maxDecibels = -10;
                // this.analyser.smoothingTimeConstant = 0.85;
                // this.distortion.connect(this.biquadFilter);
                // this.biquadFilter.connect(this.gainNode);
                // this.gainNode.connect(AUDIO_CONTEXT.destination); // connecting the different audio graph nodes together

                this.visualize();
            })
            .catch((error) => {
                console.error(error);
            })
    }

    visualize () {
        if (this.stoped) {
            return;
        }

        this.WIDTH = this.canvas.width;
        this.HEIGHT = this.canvas.height;
        switch (this.visualizationType) {

            case 'sinewave':
                this.analyser.fftSize = 2048;
                this.bufferLength = this.analyser.frequencyBinCount;
                this.dataArray = new Uint8Array(this.bufferLength);

                this.context.clearRect(0, 0, this.WIDTH, this.HEIGHT);
                
                this.drawSinewave();

                break;
            
            case 'frequencyBars':
                this.analyser.fftSize = 256;
                this.bufferLength = this.analyser.frequencyBinCount;
                this.dataArray = new Uint8Array(this.bufferLength);

                this.context.clearRect(0, 0, this.WIDTH, this.HEIGHT);
                
                this.drawFrequencyBars();

                break;
        }
    }

    drawSinewave () {
        if (this.stoped) {
            return;
        }

        requestAnimationFrame(() => this.drawSinewave());

        this.analyser.getByteTimeDomainData(this.dataArray);

        const maxValue = _.max(this.dataArray);
        const alfa = (maxValue - 128) / 127;

        this.context.fillStyle = 'rgba(255, 255, 255, 1)';
        this.context.fillRect(0, 0, this.WIDTH, this.HEIGHT);

        this.context.lineWidth = 2;
        this.context.strokeStyle = 'rgba(210, 61, 64, ' + alfa + ')';

        this.context.beginPath();

        const sliceWidth = this.WIDTH * 1.0 / this.bufferLength;
        let x = 0;

        for (let i = 0; i < this.bufferLength; i++) {

            const v = this.dataArray[i] / 128.0;
            const y = v * this.HEIGHT/2;

            if (i === 0) {
                this.context.moveTo(x, y);
            } else {
                this.context.lineTo(x, y);
            }

            x += sliceWidth;
        }

        this.context.lineTo(this.WIDTH, this.HEIGHT/2);
        this.context.stroke();
    }

    drawFrequencyBars () {
        if (this.stoped) {
            return;
        }

        requestAnimationFrame(() => this.drawFrequencyBars());

        this.analyser.getByteFrequencyData(this.dataArray);

        this.context.fillStyle = 'rgba(255, 255, 255, 1)';
        this.context.fillRect(0, 0, this.WIDTH, this.HEIGHT);

        const barWidth = (this.WIDTH / this.bufferLength) * 2.5;
        let barHeight;
        let x = 0;

        for (let i = 0; i < this.bufferLength; i++) {
            barHeight = this.dataArray[i];// + 140)*2;
            this.context.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
            this.context.fillRect(x, this.HEIGHT - barHeight / 2, barWidth, barHeight / 2);
            x += barWidth + 1;
        }
    }

    setParameters (extraParams) {
        Object.assign(this, extraParams);
    }

    stop () {
        this.stoped = true;
    }
}