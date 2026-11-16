import Image from 'next/image';

type EmptyState = 'TODO' | 'DONE';

interface EmptyProps {
  type: EmptyState;
}

export default function Empty({ type }: EmptyProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Image
        src={
          type === 'TODO' ? '/images/todo-large.svg' : '/images/done-large.svg'
        }
        width={240}
        height={240}
        alt="empty image"
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
