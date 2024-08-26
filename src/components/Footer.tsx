import React from 'react';
import { Container } from "@mui/material";
import { Instagram, Send } from 'lucide-react'; // Import the icons

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 mt-auto py-6">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="font-bold text-2xl">Hulu </span>
            <span className="text-sm tracking-[0.3em] ml-[0.05em]">Brand</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            © 2024 Hulu Brand. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="https://www.instagram.com/hulubrand" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              <Instagram size={20} />
            </a>
            <a href="https://t.me/hulubrand" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              <Send size={20} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;