import { TodoItemList } from '@/types/type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';

type TodoState = 'TODO' | 'DONE';
type TodoVariant = 'LIST' | 'DETAIL';

interface TodoItemProps {
  item: TodoItemList;
  onToggle: (id: number, checked: boolean) => void;
  type: TodoState;
  variant: TodoVariant;
  onChangeName?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function TodoItem({
  item,
  onToggle,
  type,
  variant,
  onChangeName,
}: TodoItemProps) {
  const { id, name, isCompleted } = item;
  const router = useRouter();

  const variantStyles: Record<TodoVariant, string> = {
    LIST: 'rounded-full',
    DETAIL: 'justify-center max-w-[996px] rounded-2xl',
  };

  return (
    <div
      className={`flex gap-2 items-center border-2  py-[9px] px-[12px] text-slate-900 
        ${type === 'TODO' ? 'bg-white' : 'bg-violet-100'}
        ${variantStyles[variant]}
        `}
    >
      <div className="flex gap-2 items-center">
        {/* 체크 박스 */}
        <label>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={(e) => onToggle(id, e.target.checked)}
            className="peer sr-only"
          />
          <Image
            src={
              isCompleted
                ? '/images/done-checkbox.svg'
                : '/images/todo-checkbox.svg'
            }
            width={32}
            height={32}
            alt="checkbox image"
            className="cursor-pointer"
          />
        </label>

        {/* 이름 */}
        {variant === 'LIST' ? (
          <div
            onClick={() => router.push(`/items/${id}`)}
            className={`
          ${type === 'TODO' ? '' : 'line-through'} cursor-pointer flex-1`}
          >
            {name}
          </div>
        ) : (
          <>
            <input
              type="text"
              value={name}
              className="outline-none"
              onChange={onChangeName}
            />
          </>
        )}

        {/* <div
          onClick={() => {
            if (variant === 'LIST') router.push(`/items/${id}`);
          }}
          className={`
          ${type === 'TODO' ? '' : 'line-through'} 
          ${variant === 'LIST' ? 'flex-1 cursor-pointer' : 'underline'}`}
        >
          {name}
        </div> */}
      </div>
    </div>
  );
}
