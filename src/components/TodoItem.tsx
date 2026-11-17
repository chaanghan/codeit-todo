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

/**
 * 개별 할 일을 표시하는 컴포넌트.
 *
 * type: TODO 또는 DONE에 따른 완료 상태 스타일 구분
 * variant: LIST(목록) 또는 DETAIL(상세)에 따른 UI 구분
 *
 * LIST에서는 항목 클릭 시 상세 페이지로 이동하고,
 * DETAIL에서는 할 일 이름을 수정할 수 있다.
 */
export default function TodoItem({
  item,
  onToggle,
  type,
  variant,
  onChangeName,
}: TodoItemProps) {
  const { id, name, isCompleted } = item;
  const router = useRouter();

  return (
    <div
      className={`flex gap-2 items-center border-2  py-[9px] px-[12px] text-slate-900 
        ${type === 'TODO' ? 'bg-white' : 'bg-violet-100'}
        ${variant === 'DETAIL' ? 'justify-center max-w-[996px] rounded-2xl' : 'rounded-full'}
        `}
    >
      <div className="flex gap-2 justify-center items-center w-full">
        {/* 체크 박스 */}
        <label className="cursor-pointer">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={(e) => onToggle(id, e.target.checked)}
            className="sr-only"
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
          <input
            type="text"
            value={name}
            className={`
              outline-none field-sizing-content 
              ${variant === 'DETAIL' ? 'underline min-w-20 font-bold' : ''}
              `}
            onChange={onChangeName}
          />
        )}
      </div>
    </div>
  );
}
