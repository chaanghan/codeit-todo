import TodoDetailContent from './TodoDetailContent';

interface TodoDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function TodoDetailPage({ params }: TodoDetailPageProps) {
  return <TodoDetailContent params={params} />;
}
