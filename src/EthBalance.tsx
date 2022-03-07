import React, {useEffect, useState} from "react";
import {BigNumber} from "ethers";
import {provider} from "./provider";
import Balance from "./Balance";

interface IProps {
    walletAddress: string;
}

const EthBalance = ({walletAddress}: IProps) => {

    const [displayBal, setDisplayBal] = useState<BigNumber | undefined>();

    const getBalance = (address: string) => {
        provider.getBalance(address).then(bal => {
            setDisplayBal(bal);
        });
    }

    useEffect(() => {
        getBalance(walletAddress);
    }, []);

    return (
        <Balance
            balance={displayBal}
            symbol="ETH"
        />

    )
}

export default EthBalance;
