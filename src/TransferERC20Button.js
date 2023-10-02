import React from 'react';
import { createEtherspotSdk } from '@etherspot/etherspot';

const TransferERC20Button = () => {
  const handleTransferERC20 = async () => {
    const recipient = '0xD129dB5e418e389c3F7D3ae0B8771B3f76799A52';
    const value = '0.1';
    const tokenAddress = '0x326C977E6efc84E512bB9C30f76E30c160eD06FB';

    try {
      const sdk = createEtherspotSdk({
        privateKey: process.env.REACT_APP_WALLET_PRIVATE_KEY,
        network: 'matic' // Adjust this based on your network
      });

      console.log('address: ', sdk.wallet.address);

      const transactionData = sdk.contract.createTokenTransaction({
        to: tokenAddress,
        functionName: 'transfer',
        args: [recipient, sdk.utils.parseUnits(value, 18)] // Assuming 18 decimals, adjust as needed
      });

      const userOp = await sdk.createTransaction({
        to: tokenAddress,
        data: transactionData
      });

      console.log('UserOp:', userOp);

      const uoHash = await sdk.sendTransaction(userOp);

      console.log('UserOpHash:', uoHash);

      console.log('Waiting for transaction...');
      const txReceipt = await sdk.waitForTransaction(uoHash);
      console.log('Transaction Receipt:', txReceipt);

    } catch (error) {
      console.error('Error transferring ERC20:', error);
    }
  };

  return (
    <button onClick={handleTransferERC20}>
      Transfer ERC20
    </button>
  );
};

export default TransferERC20Button;
