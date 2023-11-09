import React from "react";
import { motion } from "framer-motion";

interface ErrorProps {
  text: string;
}

const Error: React.FC<ErrorProps> = ({ text }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="mt-5 max-w-[700px] mx-auto border border-red-500 
      p-5 bg-red-500 text-white font-bold rounded-lg"
    >
      {text}
    </motion.div>
  );
};

export default Error;
