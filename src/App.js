import { useState } from "react";
import { ethers } from "ethers";
import "./App.css";
import React, { Component } from "react";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  const [greeting, setGreetingValue] = useState("");

  async function requestAccount() {
    // Request metamask account enablement
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchGreeting() {
    // Window.ethereum injected in browser by metamask
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );
      try {
        const data = await contract.greet();
        console.log("data: ", data);
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  }

  async function setGreeting() {
    // Make sure a greeting has been typed in
    if (!greeting) return;

    if (typeof window.ethereum !== "undefined") {
      // Wait for account enablement
      await requestAccount();

      // Create new provider and signer (to sign transactions)
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Create new contract instance
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);

      // Execute transaction (set new greeting)
      const transaction = await contract.setGreeting(greeting);
      setGreetingValue("");
      await transaction.wait();

      // Fetch updated greeting
      fetchGreeting();
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={fetchGreeting}>Fetch Greetings</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input
          onChange={(e) => setGreetingValue(e.target.value)}
          placeholder="Set greeting"
          value={greeting}
        />
      </header>
    </div>
  );
}

export default App;
