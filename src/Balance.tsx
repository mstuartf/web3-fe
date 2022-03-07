import React, {useEffect, useState} from "react";
import {ethers} from "ethers";
import {provider} from "./provider";

interface IProps {
    walletAddress: string;
}

const Balance = ({walletAddress}: IProps) => {

    const [displayBal, setDisplayBal] = useState<string | undefined>();

    const getBalance = (address: string) => {
        provider.getBalance(address).then(bal => {
            setDisplayBal(ethers.utils.formatEther(bal));
        });
    }

    useEffect(() => {
        getBalance(walletAddress);
    }, []);

    return (
        <div>
            $ETH: {displayBal || "Loading..."}
        </div>
    )
}

export default Balance;
