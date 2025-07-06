'use client';

import React, { useState } from 'react';

const SignupModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleGoogleSignup = () => {
    window.location.href =`${process.env.NEXT_PUBLIC_Base_URL}`;
  };

  return (
    <>
      {/* Trigger Button */}
      <button className="btn btn-primary btn-sm" onClick={() => setIsOpen(true)}>
        Sign Up
      </button>

      {/* Modal */}
      {isOpen && (
        <dialog open className="modal modal-open z-50">
          <div className="modal-box w-96 h-96  bg-base-100 text-base-content">
            <h2 className="text-2xl font-bold mb-1 text-center">Create your account</h2>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-6">
              It’s totally free and super easy
            </p>

            {/* Google Signup Button */}
            <button
              onClick={handleGoogleSignup}
              className="btn w-full bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-600 mb-4"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 533.5 544.3" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M533.5 278.4c0-18.8-1.6-37-4.6-54.6H272v103.3h146.9c-6.3 34.3-25.1 63.3-53.6 82.8l87.1 67.6c50.7-46.7 80.1-115.6 80.1-199.1z"
                  fill="#4285f4"
                />
                <path
                  d="M272 544.3c72.6 0 133.4-24 177.9-65.2l-87.1-67.6c-24.2 16.3-55 26-90.8 26-69.8 0-129-47.1-150.1-110.5H32v69.5c44.5 88.4 136.1 147.8 240 147.8z"
                  fill="#34a853"
                />
                <path
                  d="M121.9 327c-10.4-30.7-10.4-63.7 0-94.4V163H32c-39.2 78.6-39.2 171.8 0 250.4l89.9-69.5z"
                  fill="#fbbc04"
                />
                <path
                  d="M272 107.7c39.5-.6 77.6 13.8 106.5 39.9l79.2-79.2C410.8 23.3 342.6-1.2 272 0 168.1 0 76.5 59.4 32 147.8l89.9 69.5C143 154.8 202.2 107.7 272 107.7z"
                  fill="#ea4335"
                />
              </svg>
              Sign in with Google
            </button>

            {/* Cancel */}
            <div className="modal-action mt-2">
              <button
                className="btn btn-sm btn-outline w-full"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default SignupModal;
