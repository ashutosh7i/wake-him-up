import React from 'react';
import Link from 'next/link';
import { Button } from '@nextui-org/button';

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-600">404</h1>
      <p className="text-2xl mt-4">Page Not Found</p>
      <p className="mt-2 text-gray-600">Sorry, the page you are looking for does not exist.</p>
      <Link href="/" passHref>
        <Button className="mt-6" color="primary">
          Go to Home
        </Button>
      </Link>
    </div>
  );
};

export default Custom404;