import {ethers} from "ethers";

// A Web3Provider wraps a standard Web3 provider, which is
// what MetaMask injects as window.ethereum into each page
export const provider = new ethers.providers.Web3Provider((window as any).ethereum)
