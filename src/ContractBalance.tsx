import React, {useEffect, useState} from "react";
import {BigNumber, ethers} from "ethers";
import {provider} from "./provider";
import Balance from "./Balance";

interface IProps {
    walletAddress: string;
    contractAddress: string;
}

// these are the ERC-20 contract methods?
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
    const [displayBal, setDisplayBal] = useState<BigNumber | undefined>();

    const getBalance = (address: string) => {
        const contract = new ethers.Contract(contractAddress, daiAbi, provider);
        contract.symbol().then(setSymbol)
        contract.balanceOf(address).then((bal: any) => setDisplayBal(bal));
    }

    useEffect(() => {
        getBalance(walletAddress);
    }, []);

    if (!symbol) {
        return <>Loading...</>
    }

    return (
        <Balance symbol={symbol} balance={displayBal} />
    )
}

export default ContractBalance;
