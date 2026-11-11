import Image from 'next/image';

interface AddButtonProps {
  onClick: () => void;
  isEmpty: boolean;
}

export default function AddButton({ onClick, isEmpty }: AddButtonProps) {
  return (
    <button
      className={`bg-slate-200 rounded-full border-2 border-slate-900  shadow-[3px_4px_0px_#0F172A] cursor-pointer size-14 md:w-42
      ${isEmpty ? 'bg-violet-600' : 'bg-slate-200'}`}
      onClick={onClick}
    >
      <div className="flex gap-2 justify-center items-center">
        <Image
          src={isEmpty ? '/images/btn-plus-white.svg' : '/images/btn-plus.svg'}
          alt=""
          width={16}
          height={16}
        />
        <span
          className={`${isEmpty ? 'text-white' : 'text-slate-900'} font-bold text-base whitespace-nowrap hidden md:inline`}
        >
          추가하기
        </span>
      </div>
    </button>
  );
}
