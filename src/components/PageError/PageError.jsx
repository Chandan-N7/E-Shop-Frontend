import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const PageError = () => {
  return (
    <div className=" absolute top-0 left-0 w-[100vw] h-[100vh] flex items-center justify-center bg-gray-100 z-[10000]">
      <div className="bg-white p-10 rounded-lg shadow-md text-center">
        <div className="flex flex-col items-center">
          <FaExclamationTriangle className="text-red-500 text-8xl mb-4" />
          <h1 className="text-6xl font-bold text-red-500 mb-2">404</h1>
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageError;
