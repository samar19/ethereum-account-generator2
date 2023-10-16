import React, { useState } from 'react';
import { PrimeSdk, parseUnits } from '@etherspot/prime-sdk';

const TransferERC20Button = () => {
  const [address, setAddress] = useState('');

  const handleTransferERC20 = async () => {
    try {
      const primeSdk = new PrimeSdk(
        {
          privateKey: process.env.REACT_APP_WALLET_PRIVATE_KEY,
          network: 'goerli',
        },
        {
          chainId: Number(process.env.REACT_APP_CHAIN_ID),
        }
      );

      const newAddress = await primeSdk.getCounterFactualAddress();
      setAddress(newAddress);

      const recipient = newAddress;
      const value = parseUnits('0.1', 18); // Corrected this line

      const tokenAddress = '0x655F2166b0709cd575202630952D71E2bB0d61Af';

      const transactionData = primeSdk.contract.createTokenTransaction({
        to: tokenAddress,
        functionName: 'transfer',
        args: [recipient, value],
      });

      const userOp = await primeSdk.createTransaction({
        to: tokenAddress,
        data: transactionData,
      });

      const uoHash = await primeSdk.sendTransaction(userOp);

      const balance = await primeSdk.contract.readContract(
        tokenAddress,
        'balanceOf',
        recipient
      );
      console.log(`Balance of Address A (${recipient}):`, balance.toString());
    } catch (error) {
      console.error('Error transferring ERC20:', error);
    }
  };

  return (
    <div>
      <button onClick={handleTransferERC20}>
        Transfer ERC20 to New Address
      </button>
      {address && <div>Address A: {address}</div>}
    </div>
  );
};

export default TransferERC20Button;
