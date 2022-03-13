import React, {useState} from "react";
import Btn from "./Btn";
import {provider} from "./provider";
import {BigNumber, ethers} from "ethers";
import {parseEther} from "ethers/lib/utils";
import Balance from "./Balance";

const SendEth = () => {

    const [amount, setAmount] = useState<string>("");
    const [destination, setDestination] = useState<string>("");
    const [gasFees, setGasFees] = useState<BigNumber | undefined>();

    const send = () => {
        const signer = provider.getSigner();
        signer.sendTransaction({
            to: "ricmoo.firefly.eth",
            value: parseEther(amount)
        })
            .then(tx => {
                console.log(tx.blockHash);
            })
            .catch(e => {
                console.log(e.message);
            });
    }

    const estimateGas = () => {
        provider.estimateGas({
            to: destination,
            value: parseEther(amount)
        })
            .then(res => setGasFees(res))
            .catch(e => {
                console.log(e.message);
            });
    }

    return (
        <div className="grid grid-cols-1 gap-4 w-full">
            <div className="font-semibold">
                Send ETH
            </div>
            <div className="grid grid-cols-2 gap-2 w-full">
                <div className="text-left flex items-center">
                    Amount
                </div>
                <input
                    className="max-w-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={amount}
                    type="number"
                    placeholder="Enter amount of ETH to send..."
                    onChange={({target: {value}}) => setAmount(value)}
                />
            </div>
            <div className="grid grid-cols-2 gap-2 w-full">
                <div className="text-left flex items-center">
                    Destination
                </div>
                <input
                    className="max-w-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={destination}
                    type="string"
                    placeholder="Enter wallet address..."
                    onChange={({target: {value}}) => setDestination(value)}
                />
            </div>
            <div className="flex justify-between">
                <div>
                    {!!gasFees && (
                        <div className="flex items-center h-full text-xs">
                            <span>Estimated gas fees:</span>
                            &nbsp;
                            <Balance symbol="ETH" balance={gasFees} />
                        </div>
                    )}
                </div>
                <div className="flex">
                    <Btn
                        disabled={!amount || !destination}
                        onClick={estimateGas}
                    >
                        Estimate gas
                    </Btn>
                    <div className="px-1" />
                    <Btn
                        disabled={!amount || !destination || !gasFees}
                        onClick={send}
                    >
                        Send
                    </Btn>
                </div>
            </div>
        </div>
    )
}

export default SendEth;
