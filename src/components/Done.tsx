import { TodoItemList } from '@/types/type';
import TodoItem from './TodoItem';
import Image from 'next/image';

interface TodoProps {
  items: TodoItemList[];
  onToggle: (id: number, isCompleted: boolean) => void;
}

export default function Done({ items, onToggle }: TodoProps) {
  // 리스트에서 isCompleted 가 true인 것만
  return (
    <div>
      <div className="pb-4">
        <Image
          src={'/images/done.svg'}
          width={101}
          height={36}
          alt="done 이미지"
        />
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <TodoItem
            key={item.id}
            item={item}
            onToggle={onToggle}
            type="DONE"
            variant="LIST"
          />
        ))}
      </div>
    </div>
  );
}
