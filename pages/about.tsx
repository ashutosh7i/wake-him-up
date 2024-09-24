import React from "react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/router";

import Meta from "@/components/Meta";

const AboutPage = () => {
  const router = useRouter();

  return (
    <>
      <Meta />
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <div className="w-full max-w-6xl p-8">
          <div className="bg-white p-8 rounded-lg shadow-md mb-8">
            <div className="">
              <div>
                <h1 className="text-4xl font-bold mb-4 text-gray-800">
                  About Wake Them Up
                </h1>
                <p className="text-lg mb-4 text-gray-600">
                  Wake Them Up is a progressive web application designed for
                  couples to wake each other up using a single button with
                  WebRTC technology. This unique app allows partners to stay
                  connected and ensure they&apos;re up when needed, even when
                  apart.
                </p>
                <ul className="list-disc list-inside mb-4 text-gray-600">
                  <li>One-Click Wake Up</li>
                  <li>Real-Time Communication</li>
                  <li>Chat Functionality</li>
                  <li>Audio/Video Calls</li>
                  <li>Pairing System</li>
                  <li>Responsive Design</li>
                  <li>Dark Mode Support</li>
                </ul>
                <p className="text-lg text-gray-600">
                  Created by Aashutosh Soni (Ashutosh7i), this app aims to
                  implement WebRTC technology while still using it for a good
                  cause.
                </p>
                <Button
                  className="mt-4"
                  color="primary"
                  onClick={() => router.push("/")}
                >
                  Go to Home
                </Button>
              </div>
              {/* <div>
                <img
                  src="/images/hero-image.png"
                  alt="Wake Them Up"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
