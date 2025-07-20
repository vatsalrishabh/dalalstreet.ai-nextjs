'use client';
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-base-100 text-base-content">
      <h1 className="text-2xl font-bold text-primary mb-4">
        Dalalstreet<span className="text-accent">.ai</span>
      </h1>
      <ClipLoader
        color="var(--p)" // tailwind 'primary'
        loading={true}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p className="mt-4 text-base font-medium">Crunching stock data...</p>
    </div>
  );
};

export default Loader;
