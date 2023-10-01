import { PrimeSdk } from '@etherspot/prime-sdk';

const primeSdk = new PrimeSdk(
  { privateKey: process.env.REACT_APP_WALLET_PRIVATE_KEY },
  { chainId: 80001, projectKey: '' }
);

const getAbstractAddress = async () => {
  try {
    const address = await primeSdk.getCounterFactualAddress();
    return address;
  } catch (error) {
    throw new Error(`Error getting abstract address: ${error.message}`);
  }
};

export { primeSdk, getAbstractAddress };
