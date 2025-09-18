import { useAuth } from '../context/AuthContext';
import React from 'react';

const Home = () =>  {
  const { user } = useAuth();

  return (
    <div className="text-center">
      <h1>Welcome to MERN Ecom</h1>
      <p className="lead">
        {user ? 
          `Hello, ${user.name}` : 
          'Login or register to start shopping'
        }
      </p>
    </div>
  );
}
export default Home;
