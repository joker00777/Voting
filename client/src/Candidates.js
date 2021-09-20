import React, { Component } from "react";

class Candidates extends Component {
    render() {
        return (
            <div className="increase_size">
                {this.props.voted ? <h5 className="increase_size">You have already voted for House {this.props.name}</h5> : <h5 className="increase_size"> Vote your favourite house in GOT</h5>}
                <div className="row">
                    {(this.props.data).map((d, index) => (
                        <div className="col-sm" key={index}>
                            <button className={`btn btn-outline-primary btn-sm ${this.props.voted ? "disabled" : ""}`} onClick={() => { this.props.votecandidate(index) }} > {d.name} </button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}


export default Candidates;