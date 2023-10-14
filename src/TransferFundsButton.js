import React, { useState } from 'react';
import { PrimeSdk } from '@etherspot/prime-sdk';

const TransferFundsButton = () => {
  const [transactionHash, setTransactionHash] = useState(null);

  const handleTransferFunds = async () => {
    const recipient = '0x80a1874E1046B1cc5deFdf4D3153838B72fF94Ac';
    const value = '0.01';

    try {
      const primeSdk = new PrimeSdk(
        { privateKey: process.env.REACT_APP_WALLET_PRIVATE_KEY },
        { chainId: Number(process.env.REACT_APP_CHAIN_ID) }
      );

      console.log('address: ', primeSdk.state.walletAddress);

      const address = await primeSdk.getCounterFactualAddress();
      console.log('EtherspotWallet address:', address);

      await primeSdk.clearUserOpsFromBatch();

      const transactionBatch = await primeSdk.addUserOpsToBatch({
        to: recipient,
        value: value
      });
      console.log('transactions: ', transactionBatch);

      const balance = await primeSdk.getNativeBalance();
      console.log('balances: ', balance);

      // Depending on your SDK, this is where you'd sign the transaction
      // Example: const signedTransaction = await primeSdk.signTransaction(transactionBatch);

      // Send the signed transaction
      // Example: const txHash = await primeSdk.sendTransaction(signedTransaction);

      const txHash = '0x4944a57ba44a196c33c3e6aab4f80725693c0acbbff1731286fa14285941f90c'; // Placeholder for actual transaction hash
      setTransactionHash(txHash);
      console.log('Transaction sent:', txHash);

    } catch (error) {
      console.error('Error transferring funds:', error);
    }
  };

  return (
    <div>
      <button onClick={handleTransferFunds}>
        Transfer Funds
      </button>
      {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
    </div>
  );
};

export default TransferFundsButton;
