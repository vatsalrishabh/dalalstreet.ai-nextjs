'use client';

import React, { useState } from 'react';

const SignupModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, password });
    setIsOpen(false); // Close modal after submit
  };

  return (
    <>
      {/* Trigger Button */}
      <button className="btn btn-primary btn-sm" onClick={() => setIsOpen(true)}>
        Sign Up
      </button>

      {/* Modal (conditional rendering) */}
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Create your account</h3>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  className="input input-bordered w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Sign Up
              </button>
            </form>

            <div className="modal-action">
              <button className="btn btn-ghost" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignupModal;
