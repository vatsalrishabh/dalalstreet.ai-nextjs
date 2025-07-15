"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import SignupModal from "../Signup/SignupModal";
import ToggleTheme from "../ToggleTheme/ToggleTheme";

const navLinks = [
  // { href: "#features", label: "Features" },
  // { href: "#pricing", label: "Pricing" },
  { href: "#screen", label: "Screens" },
];

const DaisyNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  useEffect(() => {
    const checkScreen = () => setIsLargeScreen(window.innerWidth >= 640);
    checkScreen(); // initial

    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const words = isLargeScreen
    ? ['DalalStreet.ai', 'Find. Screen. Profit.']
    : ['DalalStreet.ai'];

  return (
    <>
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-sm px-4 sm:px-6">
        {/* Left: Logo */}
        <div className="flex-1">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-primary">
            <Typewriter
              words={words}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </Link>
        </div>

        {/* Center: Links */}
        <div className="hidden sm:flex justify-center flex-1 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="btn btn-ghost text-sm sm:text-base hover:text-primary transition duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex-none flex items-center gap-3">
          <ToggleTheme /> {/* ✅ Used here */}
          <SignupModal />
          <div className="sm:hidden">
            <motion.button
              onClick={() => setMobileMenuOpen(true)}
              className="btn btn-ghost btn-circle"
              aria-label="Open Menu"
              whileTap={{ scale: 0.9 }}
            >
              <Menu className="w-6 h-6" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Fullscreen Modal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-base-100 flex flex-col items-center justify-center gap-8 text-center px-6"
          >
            <motion.button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-4 btn btn-ghost btn-circle"
              aria-label="Close Menu"
              whileTap={{ scale: 0.9 }}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-bold text-primary"
            >
              DalalStreet.ai
            </Link>

            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium hover:text-primary"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            {/* ToggleTheme inside mobile modal */}
            <div className="mt-6">
              <ToggleTheme /> 
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DaisyNavbar;
