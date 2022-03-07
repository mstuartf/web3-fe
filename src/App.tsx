import React, {useEffect, useState} from 'react';
import './App.css';
import Balance from "./Balance";
import ContractBalance from "./ContractBalance";
import {provider} from "./provider";

function App() {

  const [walletAddress, setWalletAddress] = useState<string | undefined>();
  const [newContractAddress, setNewContractAddress] = useState<string>("");
  const [contractAddresses, setContractAddresses] = useState<string[]>([]);

  const connectWallet = () => {
    provider.send("eth_requestAccounts", []).then(res => {
      setWalletAddress(res[0]);
    });
  }

  useEffect(() => {
    connectWallet();
  }, []);

  if (!walletAddress) {
    return <>Loading...</>
  }

  return (
    <div>
      <div>
        Your wallet address is: {walletAddress}
      </div>
      <Balance
          walletAddress={walletAddress}
      />
        <div>
          {contractAddresses.map(add => (
              <ContractBalance
                  key={add}
                  walletAddress={walletAddress}
                  contractAddress={add}
              />
          ))}
        </div>
        <div>
          <input
              value={newContractAddress}
              onChange={({target: {value}})=> setNewContractAddress(value)}
          />
          <button
            onClick={() => {
              setContractAddresses([
                  ...contractAddresses,
                  newContractAddress
              ]);
              setNewContractAddress("");
            }}>
            Show balance
          </button>
        </div>
    </div>
  );
}

export default App;

// As you already figured out in the comments, nobody knows all the token balances of your account, not even MetaMask.
// This is due to the fact that the tokens do not reside in your account, but in the token smart contract which tracks your token balance.
