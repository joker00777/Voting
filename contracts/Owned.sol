// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;


contract Owner{
    address owner;
    constructor(){
        owner=msg.sender;
    }
    modifier only_owner{
        require(msg.sender==owner,"You are not allowed");
        _;
    }
}

