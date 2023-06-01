import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Product Catalog Project</h1>
      <p className="text-lg text-gray-700 mb-8">Hoş geldiniz!</p>
      <p className="text-lg text-gray-700 mb-8">PrimeFor Teknoloji Staj Projesi</p>
      <div className="flex space-x-4">
        <button
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md"
          onClick={handleRegisterClick}
        >
          Kayıt Ol
        </button>
        <button
          className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-md shadow-md"
          onClick={handleLoginClick}
        >
          Giriş
        </button>
      </div>
    </div>
  );
};

export default Home;
