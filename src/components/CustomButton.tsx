import Image from 'next/image';

type ButtonState = '수정 완료' | '삭제하기' | '추가하기';

interface CustomButtonProps {
  label: ButtonState;
}

// 버튼 스타일
const buttonStyles = {
  추가하기: 'bg-slate-200 size-14 md:w-42',
  삭제하기: 'bg-rose-500 w-42 h-14',
  '수정 완료': 'bg-slate-200 w-42 h-14',
};

// 버튼 아이콘 스타일
const buttonicons = {
  추가하기: '/images/btn-plus.svg',
  삭제하기: '/images/X.svg',
  '수정 완료': '/images/check.svg',
};

// 텍스트 스타일
const textStyles = {
  추가하기: 'hidden md:inline',
  삭제하기: 'text-white',
  '수정 완료': '',
};

export default function CustomButton({ label }: CustomButtonProps) {
  return (
    <button
      className={`
        flex gap-2 justify-center items-center
        rounded-full border-2 border-slate-900 shadow-[3px_4px_0px_#0F172A] 
        cursor-pointer 
        ${buttonStyles[label]}
      `}
    >
      <Image src={buttonicons[label]} alt="button" width={16} height={16} />
      <span
        className={`
            font-bold 
            text-base 
            whitespace-nowrap
            ${textStyles[label]}
            `}
      >
        {label}
      </span>
    </button>
  );
}
