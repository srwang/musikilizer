import React, { Component, Fragment } from "react";
import { TextField, Button } from '@material-ui/core';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            apiResponse: "",
            textContent: "", 
        };
        this.handleChange = this.handleChange.bind(this);
        this.makeMusic = this.makeMusic.bind(this);
    }

    handleChange = type => event => {
        let value = event.target.value
        this.setState({ [type]: value })
    }

    makeMusic = () => {
        const synth = new Tone.MembraneSynth().toMaster();
        const words = this.state.textContent.split(" ");
        let notes = words.map(word => {

        })
        //make words into notes
        //when it is done, buttons should read "play" and "reset"
        //play
        //reset
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
                <Button
                    onClick={this.makeMusic()}
                >
                    Submit
                </Button>
            </Fragment>
        );
    }
}

export default Home;
