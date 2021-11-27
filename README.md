# TicTacToe Dapp
A dapp for participants to bet on and compete in tic toe games using Ethereum

## Stack and Technologies
1. React.js - User Interface
2. Hardhat - Local testnet and deployment
3. Ethereum - Base blockchain network
4. Metamask - Wallets
5. Ropsten - Hosted testnet
6. Infura - Hosted Ethereum node to interact with Ropsten

## Project Management and Learning
- [Trello](https://trello.com/b/jmvSTreQ)
- [Notes](https://gold-raptor-98e.notion.site/Full-stack-dApp-guide-37b9bd5240814587855f2573815f4d0e)

## Resources and Tutorials
1. [Full stack dapp guide](https://www.youtube.com/watch?v=a0osIaAOFSE)
2. [Tutorialspoint](https://www.tutorialspoint.com/solidity/index.htm)
3. [Betting dApp guide](https://medium.com/coinmonks/create-a-sports-betting-dapp-on-the-ethereum-blockchain-part-1-1f69f908b939)


## Problem Statement
This should simulate tic tac toe game on which participating players can bet using
ether/erc20 token.
### Specs
1. Player 1 creates a new game specifying & depositing bet in ether or erc20 token
2. Player 2 accepts the challenge & deposits matching amount
3. The game begins once Player 2 makes first move
4. Once winner is decided, move locked funds to winner's address. Normal tic tac toe
rules apply.
### Expectations
1. Clean & modular solidity code
2. Readme
3. Note assumptions
4. Approach on how winner is decided
### Bonus Points
1. User interactions with contracts via meta-transactions (check 0x project)
2. Simple react UI. Assume things as needed. Use tools as required.
### Duration
Maximum 4 days (the sooner the better)