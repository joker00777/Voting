// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "./Owned.sol";

contract Voting is Owner{
    
    struct candidate{
        string name;
        uint votes;
    }
    
    struct voter{
        bool voted;
        uint vote_number;
    }
    
    event newCandidate(string name);
    event vote_added(string name,uint votes);
    
    mapping (address=>voter) public mp;
    
    candidate[] public candidates;
    
    uint public total_votes;
    
    constructor(){
        total_votes=0;
    }
    
    function addCandidate(string memory _name) public only_owner{
        candidates.push(candidate(_name,0));
        emit newCandidate(_name);
    }
    
    function getall() public view returns(candidate[] memory){
        return candidates;
    }
    
    function isOwner() public view returns(bool){
        return (msg.sender==owner);
    }

    function already_voted(address _ad) public view returns(bool){
        return mp[_ad].voted;
    }

    function voted_who(address _ad) public view returns(string memory){
        require(already_voted(_ad),"You have not voted");
        return candidates[mp[_ad].vote_number].name;
    }

    function vote(uint _vote) public{
        require(!mp[msg.sender].voted,"You have already voted,Can't change or vote again");
        mp[msg.sender].voted=true;
        mp[msg.sender].vote_number=_vote;
        candidates[_vote].votes+=1;
        total_votes+=1;
        emit vote_added(candidates[_vote].name,candidates[_vote].votes);
    }
    
}