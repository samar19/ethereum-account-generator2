import React from 'react';
import { PrimeSdk } from '@etherspot/prime-sdk';

const TransferFundsButton = () => {
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
        value: value // No need to parseEther here
      });
      console.log('transactions: ', transactionBatch);

      const balance = await primeSdk.getNativeBalance();
      console.log('balances: ', balance);

      const op = await primeSdk.sign();
      console.log('Signed UserOp:', op);

      const uoHash = await primeSdk.send(op);
      console.log('UserOpHash:', uoHash);

      console.log('Waiting for transaction...');
      const txHash = await primeSdk.getUserOpReceipt(uoHash);
      console.log('Transaction hash:', txHash);

    } catch (error) {
      console.error('Error transferring funds:', error);
    }
  };

  return (
    <button onClick={handleTransferFunds}>
      Transfer Funds
    </button>
  );
};

export default TransferFundsButton;
