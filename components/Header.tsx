import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const Header: React.FC = () => {

  return (
    <header className="sticky top-0 z-30 w-full bg-white flex items-center justify-between space-x-2 font-bold px-10 py-1">
      <div className="flex items-center space-x-1">
        <Link href="/">
          <Image
            className="rounded-full"
            src="/images/image.jpg"
            width={60}
            height={50}
            alt="logo"
          />
        </Link>
        <p className=''>Living Healthy</p>
      </div>
      <div>
        <Link
          href="/"
          className="px-4 py-2 text-sm md:text-base bg-blue-800 text-[#ebedf0] 
          flex items-center rounded-full text-center"
        >
          {' '}
          Sign up
        </Link>
      </div>
    </header>
  );
}

export default Header