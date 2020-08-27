import React from 'react';
import WaveBell from 'wavebell';

export default class App extends React.Component {
    canvasRef = React.createRef();
    canvasCtx;

    bell = new WaveBell();
    currentValue = 0;

    // buffered wave data
    BUF_SIZE = 500;
    buffer = new Array(this.BUF_SIZE).fill(0);
    cursor = 0;

    constructor() {
        super();

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
        this.buffer[this.cursor++ % this.BUF_SIZE] = this.currentValue;
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
        for (var i = 0; i < this.BUF_SIZE; i++) {
            var h = 250 * this.buffer[(this.cursor + i) % this.BUF_SIZE];
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
        // draw next frame
        this.drawFrame();
    }

    onWaveChange(e) {
        // update current wave value
        this.currentValue = e.value;
    }

    render() {
        return (
            <div className="audio-visualizer">
                <canvas ref={this.canvasRef} className="visualizer-canvas" width="500" height="150"></canvas>
            </div>
        );
    }
}
