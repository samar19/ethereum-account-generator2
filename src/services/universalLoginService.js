// src/services/universalLoginService.js

import { SDK } from '@universal-login/sdk';

const sdk = new SDK({
  // Initialize with your network configuration
});

const createUser = async () => {
  // Use SDK to create a new user
  const user = await sdk.createUser();
  return user;
};

const loginUser = async () => {
  // Use SDK to log in an existing user
  const user = await sdk.loginUser();
  return user;
};

export { createUser, loginUser };
