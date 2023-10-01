// src/pages/HomePage.js

import React from 'react';
import { createUser, loginUser } from '../services/universalLoginService'; // Relative path to universalLoginService.js

const HomePage = () => {
  const handleCreateUser = async () => {
    try {
      const user = await createUser();
      console.log('Created user:', user);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleLoginUser = async () => {
    try {
      const user = await loginUser();
      console.log('Logged in user:', user);
    } catch (error) {
      console.error('Error logging in user:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Homepage</h1>
      <button onClick={handleCreateUser}>Create User</button>
      <button onClick={handleLoginUser}>Login User</button>
    </div>
  );
};

export default HomePage;
