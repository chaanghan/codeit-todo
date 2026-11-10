import { TodoItemList } from '@/types/type';
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
    <div className="flex">
      <input
        type="checkbox"
        checked={isCompleted}
        onChange={(e) => onToggle(id, e.target.checked)}
      />
      <div onClick={() => router.push(`/items/${id}`)}>{name}</div>
    </div>
  );
}
