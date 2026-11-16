import { TodoItemList } from '@/types/type';
import Image from 'next/image';
import TodoItem from './TodoItem';
import Empty from './Empty';

type TodoSectionState = 'TODO' | 'DONE';

interface TodoSectionProps {
  items: TodoItemList[];
  onToggle: (id: number, isCompleted: boolean) => void;
  type: TodoSectionState;
}

export default function TodoSection({
  items,
  onToggle,
  type,
}: TodoSectionProps) {
  return (
    <div>
      <div className="pb-4">
        {type === 'TODO' ? (
          <Image
            src={'/images/todo.svg'}
            width={101}
            height={36}
            alt="todo 이미지"
          />
        ) : (
          <Image
            src={'/images/done.svg'}
            width={101}
            height={36}
            alt="done 이미지"
          />
        )}
      </div>
      {items.length === 0 ? (
        <Empty type={type} />
      ) : (
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <TodoItem
              key={item.id}
              item={item}
              onToggle={onToggle}
              type={type}
              variant="LIST"
            />
          ))}
        </div>
      )}
    </div>
  );
}
