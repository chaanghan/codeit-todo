'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

/**
 * 모든 페이지 상단에 표시되는 공통 헤더 컴포넌트
 * 화면 크기에 따라 다른 로고 이미지를 표시
 */
export default function Header() {
  const router = useRouter();

  // 홈에서는 새로고침하고, 다른 페이지에서는 홈으로 이동
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
