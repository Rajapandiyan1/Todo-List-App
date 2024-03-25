'use client'
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation';  
import React from 'react';

function Page() {
  const router = useRouter();

  return (
    <button onClick={() => { router.push('/Home') }}>Register</button>
  );
}

export default Page;
