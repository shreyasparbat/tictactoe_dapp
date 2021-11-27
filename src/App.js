import { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import React, { Component } from "react";
import Betting from "./artifacts/contracts/Betting.sol/Betting.json";

const bettingAddress = "0x365Bf95A025B5884a000df6E1E4886B3E998e6E7";

function App() {
  const [winner, setWinner] = useState("");
  const [gameBoard, setGameBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(2);
  const [player1HasBet, setPlayer1HasBet] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState("");
  const [betAmount, setBetAmount] = useState(0);

  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  async function acceptPayment() {
    if (typeof window.ethereum !== "undefined") {
      setPaymentSuccessful("Processing Transaction...");
      await window.ethereum.send("eth_requestAccounts");
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(bettingAddress, Betting.abi, signer);
      const txn = await contract.bet({
        value: ethers.utils.parseEther(betAmount),
      });
      await txn.wait();
      console.log(await contract.balanceOf());
    }
  }

  async function player1Bet() {
    await acceptPayment();
    setPlayer1HasBet(true);
    setPaymentSuccessful("Player 1");
  }

  async function player2Bet() {
    await acceptPayment();
    setPaymentSuccessful("Player 2");
  }

  function checkEndGame() {
    // Check for winner
    for (let i = 0; i < winningLines.length; i += 1) {
      const [a, b, c] = winningLines[i].map((num) => [
        Math.floor(num / 3),
        num % 3,
      ]);
      if (
        gameBoard[a[0]][a[1]] &&
        gameBoard[a[0]][a[1]] === gameBoard[b[0]][b[1]] &&
        gameBoard[a[0]][a[1]] === gameBoard[c[0]][c[1]]
      ) {
        return currentPlayer === 1 ? "Player 1" : "Player 2";
      }
    }

    // Check for draw
    var nullCount = 0;
    gameBoard.forEach((row) =>
      row.forEach((elem) => (nullCount += elem === null ? 1 : 0))
    );
    if (nullCount === 0) {
      return "draw";
    }

    // Game should continue
    return false;
  }

  async function endGame() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(bettingAddress, Betting.abi, signer);
    await contract.endGame(winner === "Player 1");
    console.log(await contract.balanceOf());
  }

  async function setSelection(row, col) {
    gameBoard[row][col] = currentPlayer === 1 ? "x" : "o";
    setGameBoard(gameBoard);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    const gameEnd = checkEndGame(row, col);
    if (gameEnd) {
      setWinner(gameEnd);
      await endGame();
    }
  }

  function isFloat(val) {
    var floatRegex = /^-?\d+(?:[.,]\d*?)?$/;
    if (!floatRegex.test(val)) return false;
    val = parseFloat(val);
    if (isNaN(val)) return false;
    return true;
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* Bet amount and buttons */}
        Bet Amount (in ETH):
        <input
          value={betAmount}
          onChange={(e) => setBetAmount(e.target.value)}
          disabled={player1Bet}
        />
        <button
          onClick={player1Bet}
          disabled={player1HasBet || betAmount <= 0 || !isFloat(betAmount)}
        >
          Player 1 Bet
        </button>
        <button onClick={player2Bet} disabled={!player1HasBet}>
          Player 2 Bet
        </button>
        <br />
        {/* Payment message */}
        {paymentSuccessful === "" ? (
          <div></div>
        ) : paymentSuccessful === "Player 1" ? (
          <div>Player 1 payment successful</div>
        ) : paymentSuccessful === "Player 2" ? (
          <div>All payments made. Start game</div>
        ) : (
          <div>{paymentSuccessful}</div>
        )}
        <br />
        {/* Game Board */}
        <p>
          Note: P2 goes first, and active account pays gas-fees for final
          transaction
        </p>
        {gameBoard.map((row, i) => (
          <view style={{ flexDirection: "row" }}>
            {row.map((val, j) => (
              <button
                onClick={(_) => setSelection(i, j)}
                disabled={
                  val !== null ||
                  winner !== "" ||
                  paymentSuccessful !== "Player 2"
                }
              >
                {val === null ? "-" : val}
              </button>
            ))}
          </view>
        ))}
        {/* Winner message */}
        {winner === "" ? (
          <div></div>
        ) : winner === "draw" ? (
          <div>Game Draw. No funds withdrawn</div>
        ) : (
          <div>Winner is {JSON.stringify(winner)}! Funds transferred.</div>
        )}
      </header>
    </div>
  );
}

export default App;
