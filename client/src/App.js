import React, { Component } from "react";
import VotingContract from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";
import Barchat from "./Barchat";
import Candidates from "./Candidates";
import Owner from "./Owner";
import 'bootstrap/dist/css/bootstrap.min.css';



import "./App.css";

class App extends Component {
    state = { loaded: false, isowner: false, voted: false, candidate_name: "" };
    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            this.web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            this.accounts = await this.web3.eth.getAccounts();

            // Get the contract instance.
            this.networkId = await this.web3.eth.net.getId();

            // const deployedNetwork = SimpleStorageContract.networks[networkId];
            this.instance = new this.web3.eth.Contract(
                VotingContract.abi,
                VotingContract.networks[this.networkId] && VotingContract.networks[this.networkId].address,
            );

            this.data = await this.instance.methods.getall().call();

            // console.log(this.data);

            this.x_axis = [];
            this.y_axis = [];
            (this.data).map((d) => {
                this.x_axis.push(d.name);
                this.y_axis.push(d.votes);
            })
            // console.log(this.x_axis);
            // console.log(this.y_axis);
            const check_voted = await this.instance.methods.already_voted(this.accounts[0]).call();
            if (check_voted) {
                var name = await this.instance.methods.voted_who(this.accounts[0]).call();
                this.setState({ candidate_name: name });
            }
            this.setState({ loaded: true, voted: check_voted });
            this.CheckIsOwner();

        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };

    CheckIsOwner = async () => {
        const check = await this.instance.methods.isOwner().call(
            { from: this.accounts[0] },
            (err, _result) => {
                if (err) {
                    console.log(err);
                }
            }
        );
        if (check) {
            this.setState({ isowner: true });
        }
        // console.log(check);
    }


    addCandidate = async (_name) => {
        if (_name.length === 0) {
            alert("Add a valid string");
            return;
        }
        // console.log(_name);
        const result = await this.instance.methods.addCandidate(_name).send(
            { from: this.accounts[0] },
            (err, _result) => {
                if (err) {
                    console.log(err);
                }
            }
        )
        alert("New candidate has been added " + result.events.newCandidate.returnValues.name);
        // console.log(result);
        window.location.reload();

    }

    voteCandidate = async (index) => {
        // console.log(index);
        const result = await this.instance.methods.vote(index).send(
            { from: this.accounts[0] },
            (err) => {
                if (err) {
                    console.log(err);
                }
            }
        )
        alert("You just voted for " + result.events.vote_added.returnValues.name);
        window.location.reload();
    }

    render() {

        if (!this.state.loaded) {
            return <div>Loading Web3, accounts, and contract...</div>;
        }
        return (
            <div className="App">
                <Barchat x={this.x_axis} y={this.y_axis} />
                <Owner check={this.state.isowner} addcandidate={this.addCandidate} addvoter={this.addVoter} />
                <Candidates name={this.state.candidate_name} voted={this.state.voted} data={this.data} votecandidate={this.voteCandidate} />
            </div>
        );
    }
}

export default App;


//have to build react-pages-git and a nice read-me and then add it to resume and maybe on linkedin.