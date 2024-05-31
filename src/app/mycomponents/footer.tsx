"use client"
import React from "react";
import { Mail, Linkedin, Github } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-7">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold">Contact</h2>
            <p className="mt-2 flex items-center">
              <Mail className="mr-2" />
              aniltiwareee@gmail.com
            </p>
          </div>
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a
              href="https://www.linkedin.com/in/adarsh-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/adarsh-repo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400 transition"
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm">Made by Adarsh</p>
            <p className="text-sm">Connect with your seniors for support</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
