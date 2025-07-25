'use client';
import React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import logo from '@/assets/images/logo.png';
import Image from 'next/image';

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full px-4 bg-base-100 text-base-content">
      <div className="relative bg-base-200/80 backdrop-blur-md border border-base-300 rounded-[--radius-box] p-10 w-full max-w-sm shadow-2xl animate-fadeIn">
        
        {/* Logo with glowing animation */}
        <div className="flex justify-center mb-6">
          <div className="relative w-20 h-20 animate-pulse-glow">
            <Image
              src={logo}
              alt="Dalalstreet.ai logo"
              fill
              className="object-contain rounded-full"
              priority
            />
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-3xl font-bold tracking-wide text-primary text-center">
          Dalalstreet<span className="text-accent">.ai</span>
        </h1>

        {/* Loader */}
        <div className="flex justify-center mt-6">
          <ClipLoader
            color="var(--color-primary)"
            loading={true}
            size={55}
            aria-label="Loading Spinner"
          />
        </div>

        {/* Subtext */}
        <p className="mt-6 text-sm text-base-content text-center opacity-80">
          Crunching stock data... Please wait
        </p>
      </div>

      {/* Custom glow animation */}
      <style jsx>{`
        @keyframes pulseGlow {
          0% {
            box-shadow: 0 0 0px rgba(0, 170, 118, 0.4);
          }
          50% {
            box-shadow: 0 0 15px rgba(0, 170, 118, 0.8);
          }
          100% {
            box-shadow: 0 0 0px rgba(0, 170, 118, 0.4);
          }
        }
        .animate-pulse-glow {
          animation: pulseGlow 2.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Loader;
