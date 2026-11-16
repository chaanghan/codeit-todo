'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const onClick = () => {
    if (window.location.pathname === '/') {
      window.location.reload();
    } else {
      router.push('/');
    }
  };
  return (
    <div className=" border-b border-slate-200">
      <div className="mx-auto w-full max-w-300 h-15">
        <div className="flex items-center h-full px-5">
          <Image
            src="/images/header-small.svg"
            width={80}
            height={40}
            alt="Todo 홈"
            className="block md:hidden cursor-pointer"
            loading="eager"
            onClick={onClick}
          />
          <Image
            src="/images/header-large.svg"
            width={151}
            height={40}
            alt="Todo 홈"
            className="hidden md:block cursor-pointer"
            loading="eager"
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
}
