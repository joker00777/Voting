import React, { Component } from "react";


class Owner extends Component {
    state = { c_name: "", c_address: "" };

    handleInputChange = (event) => {
        var target = event.target;
        var value = target.type === "checkbox" ? target.checked : target.value;
        var name = target.name;
        this.setState({ [name]: value })
    }

    render() {
        if (!this.props.check) {
            return (
                <div></div>
            );
        }
        else {
            return (
                <div className="row margin_bottom">
                    <div className="col-sm small">
                        <h5 className="margin_left">Add candidate: <input className="form-control" type="text" name="c_name" value={this.state.c_name} onChange={this.handleInputChange} /> </h5>
                        <button className="margin_left btn btn-outline-success" type="button" onClick={() => { this.props.addcandidate(this.state.c_name) }} >Add Candidate </button>
                    </div>

                </div>
            );
        }
    }
}

export default Owner;