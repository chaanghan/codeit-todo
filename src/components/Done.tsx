import { TodoItemList } from '@/types/type';
import TodoItem from './TodoItem';

interface TodoProps {
  items: TodoItemList[];
  onToggle: (id: number, isCompleted: boolean) => void;
}

export default function Done({ items, onToggle }: TodoProps) {
  // 리스트에서 isCompleted 가 false인 것만
  return (
    <div>
      <h2>Todo</h2>
      {items.map((item) => (
        <TodoItem key={item.id} item={item} onToggle={onToggle} type="DONE" />
      ))}
    </div>
  );
}
