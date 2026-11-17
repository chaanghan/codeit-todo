import Image from 'next/image';

type ButtonState = '수정 완료' | '삭제하기' | '추가하기';

interface CustomButtonProps {
  label: ButtonState;
  isActive?: boolean;
  onClick?: () => void;
}

// 버튼 스타일
const buttonStyles: Record<
  ButtonState,
  {
    active: string;
    inactive: string;
  }
> = {
  추가하기: {
    active: 'bg-violet-600 size-14 md:w-42',
    inactive: 'bg-slate-200 size-14 md:w-42',
  },
  삭제하기: {
    active: 'bg-rose-500 w-42 h-14',
    inactive: 'bg-rose-500 w-42 h-14',
  },
  '수정 완료': {
    active: 'bg-lime-300 w-42 h-14',
    inactive: 'bg-slate-200 w-42 h-14',
  },
};

// 아이콘 스타일
const iconStyles: Record<
  ButtonState,
  {
    active: string;
    inactive: string;
  }
> = {
  추가하기: {
    active: '/images/btn-plus-white.svg',
    inactive: '/images/btn-plus.svg',
  },
  삭제하기: {
    active: '/images/X.svg',
    inactive: '/images/X.svg',
  },
  '수정 완료': {
    active: '/images/check.svg',
    inactive: '/images/check.svg',
  },
};

// 텍스트 스타일
const textStyles: Record<
  ButtonState,
  {
    active: string;
    inactive: string;
  }
> = {
  추가하기: {
    active: 'hidden md:inline text-white',
    inactive: 'hidden md:inline',
  },
  삭제하기: {
    active: 'text-white',
    inactive: 'text-white',
  },
  '수정 완료': {
    active: 'bg-lime-300',
    inactive: '',
  },
};

/**
 * 할 일 추가, 수정 완료, 삭제 기능에 사용하는 공통 버튼 컴포넌트
 *
 * label에 따라 버튼의 색상, 크기, 아이콘을 구분하며,
 * isActive에 따라 활성화 및 비활성화 스타일을 적용
 *
 * 추가하기 버튼은 모바일에서 아이콘만 표시하고,
 * 태블릿 이상의 화면에서는 아이콘과 텍스트를 함께 표시
 */
export default function CustomButton({
  label,
  isActive = false,
  onClick,
}: CustomButtonProps) {
  // 버튼 활성화 상태
  const isActiveButtonStyle = isActive
    ? buttonStyles[label].active
    : buttonStyles[label].inactive;

  const isActiveTextStyle = isActive
    ? textStyles[label].active
    : textStyles[label].inactive;

  const isActiveIconStyle = isActive
    ? iconStyles[label].active
    : iconStyles[label].inactive;

  return (
    <button
      className={`
        flex gap-2 justify-center items-center
        rounded-full border-2 border-slate-900 shadow-[3px_4px_0px_#0F172A] 
        cursor-pointer 
        ${isActiveButtonStyle}
      `}
      onClick={onClick}
    >
      <Image src={isActiveIconStyle} alt="button" width={16} height={16} />
      <span
        className={`
            font-bold
            text-base 
            whitespace-nowrap
            ${isActiveTextStyle}
            `}
      >
        {label}
      </span>
    </button>
  );
}
