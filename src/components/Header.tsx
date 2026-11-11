import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div className=" border-b border-slate-200">
      <div className="mx-auto w-full max-w-300 h-15">
        <div className="flex items-center h-full px-5">
          <Link href={'/'}>
            <Image
              src="/images/header-small.svg"
              width={80}
              height={40}
              alt="Todo 홈"
              className="block md:hidden"
              loading="eager"
            />
            <Image
              src="/images/header-large.svg"
              width={151}
              height={40}
              alt="Todo 홈"
              className="hidden md:block"
              loading="eager"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
