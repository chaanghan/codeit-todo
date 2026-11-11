import { TodoItemList } from '@/types/type';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type TodoState = 'TODO' | 'DONE';

interface TodoItemProps {
  item: TodoItemList;
  onToggle: (id: number, checked: boolean) => void;
  type: TodoState;
}

export default function TodoItem({ item, onToggle, type }: TodoItemProps) {
  const { id, name, isCompleted } = item;
  const router = useRouter();

  return (
    <div
      className={`flex gap-2 items-center border-2 rounded-full py-[9px] px-[12px] text-slate-900 ${type === 'TODO' ? 'bg-white' : 'bg-violet-100 '}`}
    >
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
        />
      </label>

      <div
        onClick={() => router.push(`/items/${id}`)}
        className={`${type === 'TODO' ? '' : 'line-through'} flex-1 cursor-pointer`}
      >
        {name}
      </div>
    </div>
  );
}
