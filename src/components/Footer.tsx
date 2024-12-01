import React from 'react';
import { Github, Linkedin, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-8">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-6">
          <a 
            href="https://github.com/devyn-miller" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="GitHub Profile"
          >
            <Github size={28} />
          </a>
          <a 
            href="https://linkedin.com/in/devyn-c-miller/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={28} />
          </a>
        </div>
        
        <div className="text-sm text-gray-600 space-y-2">
          <p>
            Built with <Heart className="inline-block w-4 h-4 text-red-500 mx-1 fill-current" style={{ transform: 'translateY(-2px)' }} /> by <a href="https://devyn-miller.github.io/profile-/" className="font-bold text-blue-600 hover:text-blue-800 transition-colors">Devyn Miller</a>
          </p>
          <p> {currentYear} All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
