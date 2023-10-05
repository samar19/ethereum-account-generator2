import React, { useState } from 'react';
import { PrimeSdk } from '@etherspot/prime-sdk';
import { parseUnits } from '@etherspot/prime-sdk';



const TransferERC20Button = () => {
  const [address, setAddress] = useState('');

  const handleTransferERC20 = async () => {
    try {
      // Step 1: Get a new address (Address A)
      const primeSdk = new PrimeSdk(
        {
          privateKey: process.env.REACT_APP_WALLET_PRIVATE_KEY,
          network: 'matic', // Adjust this based on your network
        },
        {
          chainId: Number(process.env.REACT_APP_CHAIN_ID),
        }
      );

      const newAddress = await primeSdk.getCounterFactualAddress();
      setAddress(newAddress);

      // Step 2: Transfer ERC20 tokens to Address A
      const recipient = newAddress;
      const value = primeSdk.utils.parseUnits('0.1', 18); // Adjust value and decimals as needed
      const tokenAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';

      const transactionData = primeSdk.contract.createTokenTransaction({
        to: tokenAddress,
        functionName: 'transfer',
        args: [recipient, value]
      });

      const userOp = await primeSdk.createTransaction({
        to: tokenAddress,
        data: transactionData
      });

      const uoHash = await primeSdk.sendTransaction(userOp);

      // Step 3: Check the balance of Address A
      const balance = await primeSdk.contract.readContract(tokenAddress, 'balanceOf', recipient);
      console.log(`Balance of Address A (${recipient}):`, balance.toString());

    } catch (error) {
      console.error('Error transferring ERC20:', error);
    }
  };

  return (
    <div>
      <button onClick={handleTransferERC20}>Transfer ERC20 to New Address</button>
      {address && <div>Address A: {address}</div>}
    </div>
  );
};

export default TransferERC20Button;
