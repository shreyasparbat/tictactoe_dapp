// SPDX-License-Identifier: Unlicensed

pragma solidity ^0.8.4;

contract Betting {
    uint public betAmount;
    address payable[2] public players;
    uint256 public balance;

    event TransferReceived(address _from, uint _amount);
    event TransferSent(address _to, uint _amount);

    constructor() {
        betAmount = 0;
    }

    function bet() external payable {
        if (betAmount == 0) {
            // Sender is Player 1
            betAmount = msg.value;
            players[0] = payable(msg.sender);
            emit TransferReceived(msg.sender, msg.value);
        } else {
            // Sender is Player 2
            require(msg.value == betAmount, "Player 2 must bet the same amount as player 1 to accept challange");
            players[1] = payable(msg.sender);
            emit TransferReceived(msg.sender, msg.value);
        }
    }

    function endGame(bool player1Won) public payable {
        // Get winning/losing player index
        uint winnerIdx = player1Won ? 0 : 1;

        // Send funds to winner
        players[winnerIdx].transfer(betAmount);
        emit TransferSent(players[winnerIdx], betAmount*2);

        // Reset variables
        betAmount = 0;
        delete players;
        balance = 0;
    }

    function balanceOf() external view returns (uint) {
        return address(this).balance;
    }
}