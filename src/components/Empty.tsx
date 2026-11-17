import Image from 'next/image';

type EmptyState = 'TODO' | 'DONE';

interface EmptyProps {
  type: EmptyState;
}

/**
 * 할 일 목록이 비어 있을 때 표시하는 안내 컴포넌트
 *
 * TODO 또는 DONE 상태에 따라 이미지와 안내 문구를 변경하며,
 * 화면 크기에 따라 모바일 또는 태블릿, PC 화면에 이미지를 표시
 */
export default function Empty({ type }: EmptyProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      {/* 모바일 이미지 */}
      <Image
        src={
          type === 'TODO' ? '/images/todo-small.svg' : '/images/done-small.svg'
        }
        width={120}
        height={120}
        alt=""
        className="block md:hidden"
      />
      {/* 태블릿, PC 이미지 */}
      <Image
        src={
          type === 'TODO' ? '/images/todo-large.svg' : '/images/done-large.svg'
        }
        width={240}
        height={240}
        alt="empty image"
        className="hidden md:block"
      />
      <div className="flex flex-col items-center">
        <span className="text-slate-400 font-bold">
          {type === 'TODO' ? '할 일이 없어요.' : '아직 다 한 일이 없어요.'}
        </span>
        <span className="text-slate-400 font-bold">
          {type === 'TODO'
            ? 'TODO를 새롭게 추가해주세요!'
            : '해야 할 일을 체크해보세요!'}
        </span>
      </div>
    </div>
  );
}
