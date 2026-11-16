import { TodoItemList } from '@/types/type';
import TodoItem from './TodoItem';
import Image from 'next/image';

interface TodoProps {
  items: TodoItemList[];
  onToggle: (id: number, isCompleted: boolean) => void;
}

export default function Todo({ items, onToggle }: TodoProps) {
  // 리스트에서 isCompleted 가 false인 것만
  console.log(items);
  return (
    <div>
      <div className="pb-4">
        <Image
          src={'/images/todo.svg'}
          width={101}
          height={36}
          alt="todo 이미지"
        />
      </div>
      {items.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-4">
          <Image
            src={'/images/todo-large.svg'}
            width={240}
            height={240}
            alt=""
          />
          <div className="flex flex-col items-center">
            <span className="text-slate-400">할 일이 없어요.</span>
            <span className="text-slate-400">TODO를 새롭게 추가해주세요!</span>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                onToggle={onToggle}
                type="TODO"
                variant="LIST"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
