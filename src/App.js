import { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import React, { Component } from "react";
import Betting from "./artifacts/contracts/Betting.sol/Betting.json";

const bettingAddress = "0xd9Bb9E42Cb63807244d727447085A509fa4caE35";

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
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(bettingAddress, Betting.abi, signer);
      const txn = await contract.bet();
      await txn.wait();
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

  return (
    <div className="App">
      <header className="App-header">
        {/* Bet Buttons */}
        <button onClick={player1Bet} disabled={player1HasBet}>
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
        ) : (
          <div>All payments made. Start game</div>
        )}
        <br />
        {/* Game Board */}
        Note: P2 goes first
        {gameBoard.map((row, i) => (
          <view style={{ flexDirection: "row" }}>
            {row.map((val, j) => (
              <button
                onClick={(e) => setSelection(0, 0)}
                disabled={
                  gameBoard[i][j] !== null ||
                  winner !== "" ||
                  paymentSuccessful !== "Player 2"
                }
              >
                {gameBoard[i][j] === null ? "-" : gameBoard[i][j]}
              </button>
            ))}
          </view>
        ))}
        <view style={{ flexDirection: "row" }}>
          <button
            onClick={(e) => setSelection(0, 0)}
            disabled={
              gameBoard[0][0] !== null ||
              winner !== "" ||
              paymentSuccessful !== "Player 2"
            }
          >
            {gameBoard[0][0] === null ? "-" : gameBoard[0][0]}
          </button>
          <button
            onClick={(e) => setSelection(0, 1)}
            disabled={
              gameBoard[0][1] !== null ||
              winner !== "" ||
              paymentSuccessful !== "Player 2"
            }
          >
            {gameBoard[0][1] === null ? "-" : gameBoard[0][1]}
          </button>
          <button
            onClick={(e) => setSelection(0, 2)}
            disabled={
              gameBoard[0][2] !== null ||
              winner !== "" ||
              paymentSuccessful !== "Player 2"
            }
          >
            {gameBoard[0][2] === null ? "-" : gameBoard[0][2]}
          </button>
        </view>
        <view style={{ flexDirection: "row" }}>
          <button
            onClick={(e) => setSelection(1, 0)}
            disabled={
              gameBoard[1][0] !== null ||
              winner !== "" ||
              paymentSuccessful !== "Player 2"
            }
          >
            {gameBoard[1][0] === null ? "-" : gameBoard[1][0]}
          </button>
          <button
            onClick={(e) => setSelection(1, 1)}
            disabled={
              gameBoard[1][1] !== null ||
              winner !== "" ||
              paymentSuccessful !== "Player 2"
            }
          >
            {gameBoard[1][1] === null ? "-" : gameBoard[1][1]}
          </button>
          <button
            onClick={(e) => setSelection(1, 2)}
            disabled={
              gameBoard[1][2] !== null ||
              winner !== "" ||
              paymentSuccessful !== "Player 2"
            }
          >
            {gameBoard[1][2] === null ? "-" : gameBoard[1][2]}
          </button>
        </view>
        <view style={{ flexDirection: "row" }}>
          <button
            onClick={(e) => setSelection(2, 0)}
            disabled={
              gameBoard[2][0] !== null ||
              winner !== "" ||
              paymentSuccessful !== "Player 2"
            }
          >
            {gameBoard[2][0] === null ? "-" : gameBoard[2][0]}
          </button>
          <button
            onClick={(e) => setSelection(2, 1)}
            disabled={
              gameBoard[2][1] !== null ||
              winner !== "" ||
              paymentSuccessful !== "Player 2"
            }
          >
            {gameBoard[2][1] === null ? "-" : gameBoard[2][1]}
          </button>
          <button
            onClick={(e) => setSelection(2, 2)}
            disabled={
              gameBoard[2][2] !== null ||
              winner !== "" ||
              paymentSuccessful !== "Player 2"
            }
          >
            {gameBoard[2][2] === null ? "-" : gameBoard[2][2]}
          </button>
        </view>
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
