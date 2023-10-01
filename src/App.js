import React, { useState } from 'react';
import { primeSdk, getAbstractAddress } from './EtherspotInitializer';

function App() {
  const [account, setAccount] = useState(null);

  const createNewAccount = async () => {
    try {
      const wallet = await primeSdk.createWallet();
      setAccount({
        address: wallet.address,
        privateKey: wallet.privateKey
      });
    } catch (error) {
      console.error(`Error creating user: ${error.message}`);
    }
  };

  const fetchAbstractAddress = async () => {
    try {
      const address = await getAbstractAddress();
      console.log('Abstract Address:', address);
    } catch (error) {
      console.error(`Error fetching abstract address: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={createNewAccount}
      >
        New Account
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={fetchAbstractAddress}
      >
        Fetch Abstract Address
      </button>
      {account && (
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold">Generated Account</h2>
          <p>Address: {account.address}</p>
          <p>Private Key: {account.privateKey}</p>
        </div>
      )}
    </div>
  );
}

export default App;
