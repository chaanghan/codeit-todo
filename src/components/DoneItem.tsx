import { TodoItemList } from '@/types/type';

interface DoneItemProps {
  item: TodoItemList;
}

export default function DoneItem({ item }: DoneItemProps) {
  const { name } = item;

  return (
    <div className="flex">
      <input type="checkbox" />
      <div>{name}</div>
    </div>
  );
}
