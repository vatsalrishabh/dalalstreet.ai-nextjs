"use client";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "@/store/redux/slices/themeSlice";
import { RootState } from "@/store/redux/store";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const ToggleTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.mode);

  const handleToggle = () => {
    dispatch(setTheme(theme === "mytheme" ? "dark" : "mytheme"));
  };

  return (
    <motion.button
      onClick={handleToggle}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-full hover:bg-base-200 transition"
      aria-label="Toggle Theme"
    >
      {theme === "mytheme" ? (
        <Moon className="w-5 h-5 text-primary" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-400" />
      )}
    </motion.button>
  );
};

export default ToggleTheme;
