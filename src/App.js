import { useState } from 'react'
import { ethers } from 'ethers'
import './App.css'
import React, { Component } from 'react'

function App() {
  const [ad1, setAd1] = useState('')
  const [ad2, setAd2] = useState('')
  const [betAmmount, setBetAmmount] = useState(0)
  const [winner, setWinner] = useState('')
  const [gameBoard, setGameBoard] = useState([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ])
  const [currentPlayer, setCurrentPlayer] = useState(2)

  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  async function startGame() {
    // // Deposit funds to contract
    // const t1 = await contract.transfer(ad1, betAmmount);
    // const t2 = await contract.tranfer(ad2, betAmmount);
    // await t1.wait();
    // await t2.wait();
    // Create contract
    // Create bet
    //
  }

  function checkEndGame() {
    // Check for winner
    for (let i = 0; i < winningLines.length; i += 1) {
      const [a, b, c] = winningLines[i].map((num) => [
        Math.floor(num / 3),
        num % 3,
      ])
      if (
        gameBoard[a[0]][a[1]] &&
        gameBoard[a[0]][a[1]] === gameBoard[b[0]][b[1]] &&
        gameBoard[a[0]][a[1]] === gameBoard[c[0]][c[1]]
      ) {
        return currentPlayer === 1 ? 'Player 1' : 'Player 2'
      }
    }

    // Check for draw
    var nullCount = 0
    gameBoard.forEach((row) =>
      row.forEach((elem) => (nullCount += elem === null ? 1 : 0)),
    )
    if (nullCount === 0) {
      return 'draw'
    }

    // Game should continue
    return false
  }

  async function setSelection(row, col) {
    gameBoard[row][col] = currentPlayer === 1 ? 'x' : 'o'
    setGameBoard(gameBoard)
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1)
    const gameEnd = checkEndGame(row, col)
    if (gameEnd) {
      console.log(gameEnd)
      setWinner(gameEnd)
      return
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <input
          onChange={(e) => setAd1(e.target.value)}
          placeholder="Player 1 Address"
          value={ad1}
        />
        <input
          onChange={(e) => setAd2(e.target.value)}
          placeholder="Player 2 Address"
          value={ad2}
        />
        <input
          onChange={(e) => setBetAmmount(e.target.value)}
          placeholder="Bet Amount"
          value={betAmmount}
        />
        <button onClick={startGame}>Start Game</button>
        <br />
        Note: P2 goes first
        <view style={{ flexDirection: 'row' }}>
          <button
            onClick={(e) => setSelection(0, 0)}
            disabled={gameBoard[0][0] !== null || winner !== ''}
          >
            {gameBoard[0][0] === null ? '-' : gameBoard[0][0]}
          </button>
          <button
            onClick={(e) => setSelection(0, 1)}
            disabled={gameBoard[0][1] !== null || winner !== ''}
          >
            {gameBoard[0][1] === null ? '-' : gameBoard[0][1]}
          </button>
          <button
            onClick={(e) => setSelection(0, 2)}
            disabled={gameBoard[0][2] !== null || winner !== ''}
          >
            {gameBoard[0][2] === null ? '-' : gameBoard[0][2]}
          </button>
        </view>
        <view style={{ flexDirection: 'row' }}>
          <button
            onClick={(e) => setSelection(1, 0)}
            disabled={gameBoard[1][0] !== null || winner !== ''}
          >
            {gameBoard[1][0] === null ? '-' : gameBoard[1][0]}
          </button>
          <button
            onClick={(e) => setSelection(1, 1)}
            disabled={gameBoard[1][1] !== null || winner !== ''}
          >
            {gameBoard[1][1] === null ? '-' : gameBoard[1][1]}
          </button>
          <button
            onClick={(e) => setSelection(1, 2)}
            disabled={gameBoard[1][2] !== null || winner !== ''}
          >
            {gameBoard[1][2] === null ? '-' : gameBoard[1][2]}
          </button>
        </view>
        <view style={{ flexDirection: 'row' }}>
          <button
            onClick={(e) => setSelection(2, 0)}
            disabled={gameBoard[2][0] !== null || winner !== ''}
          >
            {gameBoard[2][0] === null ? '-' : gameBoard[2][0]}
          </button>
          <button
            onClick={(e) => setSelection(2, 1)}
            disabled={gameBoard[2][1] !== null || winner !== ''}
          >
            {gameBoard[2][1] === null ? '-' : gameBoard[2][1]}
          </button>
          <button
            onClick={(e) => setSelection(2, 2)}
            disabled={gameBoard[2][2] !== null || winner !== ''}
          >
            {gameBoard[2][2] === null ? '-' : gameBoard[2][2]}
          </button>
        </view>
        {winner === '' ? (
          <div></div>
        ) : winner === 'draw' ? (
          <div>Game Draw. No funds withdrawn</div>
        ) : (
          <div>Winner is {JSON.stringify(winner)}! Funds transferred.</div>
        )}
      </header>
    </div>
  )
}

export default App
