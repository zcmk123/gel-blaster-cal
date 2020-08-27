import React from 'react';
import AudioVisualizer from '../components/AudioVisualizer';

export default class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <>
                <AudioVisualizer />
            </>
        );
    }
}
