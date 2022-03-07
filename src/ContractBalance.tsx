import React, {useEffect, useState} from "react";
import {ethers} from "ethers";
import {provider} from "./provider";

interface IProps {
    walletAddress: string;
    contractAddress: string;
}

const daiAbi = [
    // Some details about the token
    "function name() view returns (string)",
    "function symbol() view returns (string)",

    // Get the account balance
    "function balanceOf(address) view returns (uint)",

    // Send some of your tokens to someone else
    "function transfer(address to, uint amount)",

    // An event triggered whenever anyone transfers to someone else
    "event Transfer(address indexed from, address indexed to, uint amount)"
];

const ContractBalance = ({walletAddress, contractAddress}: IProps) => {

    const [symbol, setSymbol] = useState<string | undefined>();
    const [displayBal, setDisplayBal] = useState<string | undefined>();

    const getBalance = (address: string) => {
        const contract = new ethers.Contract(contractAddress, daiAbi, provider);
        contract.symbol().then(setSymbol)
        contract.balanceOf(address).then((bal: any) => setDisplayBal(ethers.utils.formatEther(bal)));
    }

    useEffect(() => {
        getBalance(walletAddress);
    }, []);

    return (
        <div>
            ${symbol}: {displayBal || "Loading..."}
        </div>
    )
}

export default ContractBalance;
