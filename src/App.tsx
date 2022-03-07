import React, {useEffect, useState} from 'react';
import './App.css';
import EthBalance from "./EthBalance";
import ContractBalance from "./ContractBalance";
import {provider} from "./provider";
import Btn from "./Btn";

function App() {

  const [walletAddress, setWalletAddress] = useState<string | undefined>();
  const [newContractAddress, setNewContractAddress] = useState<string>("");
  const [contractAddresses, setContractAddresses] = useState<string[]>([]);
  const [isConnecting, setIsConnecting] = useState<boolean>(true);

  const connectWallet = () => {
    provider.send("eth_requestAccounts", [])
        .then(accounts => {
            setWalletAddress(accounts[0]);
            setIsConnecting(false);
        })
        .catch(() => setIsConnecting(false));
  }

  useEffect(() => {
      provider.listAccounts()
          .then(accounts => {
              if (!!accounts.length) {
                  setWalletAddress(accounts[0]);
              }
              setIsConnecting(false);
          })
          .catch(() => setIsConnecting(false));
  }, [])

  if (isConnecting) {
    return <>Loading...</>
  }

  if (!walletAddress) {
      return (
          <div className="h-full w-full flex items-center justify-center pb-20 text-gray-700">
              <div className="w-full max-w-2xl shadow p-8 grid grid-cols-1 gap-4">
                  <div className="text-center">
                      No wallet connected. Connect your Metamask wallet?
                  </div>
              <div className="flex justify-center">
                  <Btn onClick={() => {
                      setIsConnecting(true);
                      connectWallet();
                  }}>
                      Connect wallet
                  </Btn>
              </div>
              </div>
          </div>
      )
  }

  return (
    <div className="h-full w-full flex items-center justify-center pb-20 text-gray-700">
      <div className="w-full max-w-2xl shadow p-8 grid grid-cols-1 gap-4">
          <div>
              Your wallet address is: <span className="font-bold">{walletAddress}</span>
          </div>
          <div>
              Balances:
          </div>
          <EthBalance
              walletAddress={walletAddress}
          />
          {contractAddresses.map(add => (
              <ContractBalance
                  key={add}
                  walletAddress={walletAddress}
                  contractAddress={add}
              />
          ))}
          <div className="flex">
              <input
                  placeholder="Enter contract address..."
                  className="max-w-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={newContractAddress}
                  onChange={({target: {value}})=> setNewContractAddress(value)}
              />
              <div className="px-2" />
              <Btn
                  onClick={() => {
                      setContractAddresses([
                          ...contractAddresses,
                          newContractAddress
                      ]);
                      setNewContractAddress("");
                  }}>
                  Check token balance
              </Btn>
          </div>
      </div>
    </div>
  );
}

export default App;

// As you already figured out in the comments, nobody knows all the token balances of your account, not even MetaMask.
// This is due to the fact that the tokens do not reside in your account, but in the token smart contract which tracks your token balance.
