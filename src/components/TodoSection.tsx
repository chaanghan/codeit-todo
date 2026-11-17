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

/**
 * TODO 또는 DONE 상태에 따라 할 일 목록을 표시
 * 목록이 비어 있으면 안내 이미지와 메시지를 보여줌
 */
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
            width={97}
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
