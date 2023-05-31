import { ethers } from "ethers";
import { isValidAddress } from "src/utils/isValidAddress";
import { erc20ABI } from "wagmi";

let provider: any = null;
let signer: any = null

export const initializeWeb3 = async (provider_: any, signer_: any) => {
    provider =  provider_;
    signer =  await signer_;
};

export const getTokenDetail = async (address: string) => {
    if(isValidAddress(address)) {
        const tokenContract = new ethers.Contract(address, erc20ABI, provider);
        const tokenName = await tokenContract.name();
        const tokenSymbol = await tokenContract.symbol();
        return { tokenName, tokenSymbol }
    }
}

export const getTokenBalance = async (address: string, user: string) => {
    if(isValidAddress(address)) {
        const tokenContract = new ethers.Contract(address, erc20ABI, provider);
        const tokenBalance = await tokenContract.balanceOf(user);
        const decimalsData = await tokenContract.decimals();
        const decimals = decimalsData !== undefined ? Number(decimalsData) : 18;
        const balance = tokenBalance !== undefined ? Number(tokenBalance) : 0;
        const adjustedBalance = balance / 10 ** decimals;
        const formattedBalance = Math.floor(adjustedBalance * 100) / 100;
        return formattedBalance;
    }
}

export const getEthBalance = async (user: string) => {
    if(provider !== null && provider !== undefined) {
        const _balance = await provider.getBalance(user)
        const balance = ethers.utils.formatEther(_balance);
        const formattedBalance = Math.floor(Number(balance) * 100) / 100;
        return formattedBalance;
    }
}