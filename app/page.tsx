'use client';

import Employees from '@/components/Employees';
import Image from 'next/image';

import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Adds messages only in a dev environment
      loadDevMessages();
      loadErrorMessages();
    }
  }, []);
  return (
    <main className="">
      <Employees />
    </main>
  );
}
