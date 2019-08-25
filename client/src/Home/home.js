import React, { Component, Fragment } from "react";
import { TextField, Button } from '@material-ui/core';
import Tone from 'tone';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            apiResponse: "",
            textContent: "", 
            musicReady: false,
            notes: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.changeWordsToNotes = this.changeWordsToNotes.bind(this);
    }

    handleChange = type => event => {
        let value = event.target.value
        this.setState({ [type]: value })
    }

    changeWordsToNotes = () => {
        const words = this.state.textContent.split(/[.,!?:;\"-]|\s/);
        const startLetterToNote = { a: 'C1', b: 'D1', c: 'E1', d: 'F1', e: 'G1', f: 'A1', g: 'B1', h: 'C2', i: 'D2', j: 'E2', k: 'F2', l: 'G2', m: 'A2', n: 'B2', o: 'C3', p: 'D3', q: 'E3', r: 'F3', s: 'G3', t: 'A3', u: 'B3', v: 'C4', w: 'D4', x: 'E4', y: 'F4', z: 'G4' }

        let notes = words.map(word => {
            if (word.length === 0) return null;

            word = word.toLowerCase();
            let note = startLetterToNote[word[0]];

            let lastLetter = word[word.length-1]

            if (['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'].includes(lastLetter)) {
                note = note.split('');
                note.splice(1, 0, 'b');
                note = note.join('');
            } else if (['q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].includes(lastLetter)) {
                note = note.split('');
                note.splice(1, 0, '#');
                note = note.join('');
            }
            return note;
        })
        this.setState({notes: notes});
        this.setState({musicReady: true});
    }

    playMusic = () => {
        const synth = new Tone.MembraneSynth().toMaster();
        const notes = this.state.notes;

        const synthPart = new Tone.Sequence(
          function(time, note) {
            synth.triggerAttackRelease(note, "10hz", time);
          },
          notes,
          "4n"
        );

        synthPart.loop = 0;

        synthPart.start();

        Tone.Transport.start();
    }

    stopMusic = () => {
        Tone.Transport.stop();
    }

    resetMusic = () => {
        this.setState({notes: []});
        this.setState({textContent: ""});
        this.setState({musicReady: false});
    }

    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
            <Fragment>
                <div>Input your text to translate into music</div>
                <TextField 
                    multiline
                    value={this.state.textContent}
                    onChange={this.handleChange('textContent')}
                >
                </TextField>
                { !this.state.musicReady && (
                    <Button
                        variant="contained"
                        onClick={this.changeWordsToNotes}
                    >
                        Submit
                    </Button>
                )}
                { this.state.musicReady && (
                    <Fragment>
                        <Button
                            variant="contained"
                            onClick={this.playMusic}
                        >
                            Play
                        </Button>
                        <Button
                            variant="contained"
                            onClick={this.stopMusic}
                        >
                            Stop
                        </Button>
                        <Button
                            variant="contained"
                            onClick={this.resetMusic}
                        >
                            Reset
                        </Button>
                    </Fragment>
                )}
            </Fragment>
        );
    }
}

export default Home;
