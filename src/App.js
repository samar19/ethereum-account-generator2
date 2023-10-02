import React, { useState } from 'react';
import { getAbstractAddress } from './EtherspotInitializer';
import TransferFundsButton from './TransferFundsButton';

function App() {
  const [account, setAccount] = useState(null);

  const createNewAccount = async () => {
    try {
      const address = await getAbstractAddress();
      setAccount({
        address: address,
      });
    } catch (error) {
      console.error(`Error creating user: ${error.message}`);
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
      {account && (
        <div className="mt-4 text-center">
          <h2 className="text-xl font-bold">Generated Account</h2>
          <p>Address: {account.address}</p>
          <TransferFundsButton /> {/* Include TransferFundsButton component */}
        </div>
      )}
    </div>
  );
}

export default App;
