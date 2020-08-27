import React from 'react';
import WaveBell from 'wavebell';

let currentValue;
let buffer;
let cursor = 0;
const BUF_SIZE = 500;

export default class App extends React.Component {
    canvasRef = React.createRef();
    canvasCtx;

    bell = new WaveBell();

    constructor() {
        super();

        buffer = new Array(BUF_SIZE).fill(0);
        currentValue = 0;
        this.bell.start(1000 / 25);

        this.bell.on('wave', this.onWaveChange);
    }

    componentDidMount() {
        this.canvasCtx = this.canvasRef.current.getContext('2d');
        this.animate();
    }

    componentWillUnmount() {
        this.bell && this.bell.stop && this.bell.stop();
    }

    updateBuffer() {
        // loop update buffered data
        buffer[cursor++ % BUF_SIZE] = currentValue;
    }

    drawFrame() {
        const { canvasCtx: ctx } = this;
        ctx.save();
        // empty canvas
        ctx.clearRect(0, 0, 500, 150);
        ctx.fillStyle = '#ddd';
        ctx.fillRect(0, 0, 500, 150);
        // draw audio waveform
        ctx.strokeStyle = '#6c4';
        for (var i = 0; i < BUF_SIZE; i++) {
            var h = 250 * buffer[(cursor + i) % BUF_SIZE];
            var x = i;
            ctx.beginPath();
            ctx.moveTo(x, 75.5 - 0.5 * h);
            ctx.lineTo(x, 75.5 + 0.5 * h);
            ctx.stroke();
        }
        // draw middle line
        ctx.beginPath();
        ctx.moveTo(0, 75.5);
        ctx.lineTo(500, 75.5);
        ctx.strokeStyle = '#000';
        ctx.stroke();
        ctx.restore();
    }

    animate() {
        requestAnimationFrame(() => {
            this.animate();
        });
        // update wave data
        this.updateBuffer();
        // console.log(currentValue);

        // draw next frame
        this.drawFrame();
    }

    onWaveChange(e) {
        // update current wave value

        currentValue = e.value;
    }

    render() {
        return (
            <div className="audio-visualizer">
                <canvas ref={this.canvasRef} className="visualizer-canvas" width="500" height="150"></canvas>
            </div>
        );
    }
}
