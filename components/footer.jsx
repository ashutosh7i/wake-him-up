import React from "react";
import { Link } from "@nextui-org/link";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-sm space-y-2">
          <p className="text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Wake Him Up. All rights reserved.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Made with <span className="text-red-500">💖</span> by{" "}
            <a
              href="https://github.com/Ashutosh7i"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary hover:underline"
            >
              Ashutosh7i
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
