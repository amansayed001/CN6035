// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccessControl {
    address public owner;
    uint256 public accessFee = 0.01 ether; // one-time fee
    mapping(address => bool) public hasPaid;

    constructor() {
        owner = msg.sender;
    }

    function payAccessFee() public payable {
        require(!hasPaid[msg.sender], "Already paid!");
        require(msg.value >= accessFee, "Insufficient payment!");

        hasPaid[msg.sender] = true;
    }

    function checkAccess(address user) public view returns (bool) {
        return hasPaid[user];
    }

    function withdraw() public {
        require(msg.sender == owner, "Only owner can withdraw!");
        payable(owner).transfer(address(this).balance);
    }
}
