import { ethers } from "ethers";

export const isValidAddress = (tokenAddy: string) => {
  // Check if the address is a contract address
  const isValidContract = tokenAddy.startsWith('0x');

  // Check if the address is a checksum address
  console.log('isValidContract: ', isValidContract);
  const isChecksumAddress = ethers.utils.isAddress(tokenAddy);
  console.log('isChecksumAddress: ', isChecksumAddress);
  console.log('ethers.utils.isAddress(tokenAddy): ', ethers.utils.isAddress(tokenAddy));

  return isValidContract && isChecksumAddress;
};
