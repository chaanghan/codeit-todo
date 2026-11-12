import { getTodo } from '@/lib/todo';
import TodoDetailClient from './TodoDetailClient';

interface TodoDetailContentProps {
  params: Promise<{ id: string }>;
}

export default async function TodoDetailContent({
  params,
}: TodoDetailContentProps) {
  const { id } = await params;

  const todo = await getTodo(Number(id));

  return <TodoDetailClient initialTodo={todo} />;
}
