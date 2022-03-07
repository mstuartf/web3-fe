import React, {useEffect, useState} from "react";
import {BigNumber, ethers} from "ethers";
import {provider} from "./provider";

interface IProps {
    symbol: string;
    balance?: BigNumber;
}

const Balance = ({symbol, balance}: IProps) => (
    <div>
        <span className="font-bold">${symbol}</span>: {balance ? ethers.utils.formatEther(balance) : "Loading..."}
    </div>
)

export default Balance;
