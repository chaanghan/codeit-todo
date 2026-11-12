import { Suspense } from 'react';
import TodoDetailContent from './TodoDetailContent';

interface TodoDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function TodoDetailPage({ params }: TodoDetailPageProps) {
  return (
    <Suspense fallback={<div>상세 페이지 로딩 중...</div>}>
      <TodoDetailContent params={params} />
    </Suspense>
  );
}
