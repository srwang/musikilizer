import React, { Component } from "react";

class Archive extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    // callAPI() {
    //     fetch("http://localhost:9000/testAPI")
    //         .then(res => res.text())
    //         .then(res => this.setState({ apiResponse: res }))
    //         .catch(err => err);
    // }

    // componentDidMount() {
    //     this.callAPI();
    // }

    render() {
        return (
           <div>archive</div>
        );
    }
}

export default Archive;
