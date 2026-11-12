import { ReactNode, Suspense } from 'react';

interface TodoDetailSuspenseProps {
  children: ReactNode;
  params: Promise<{ id: string }>;
}

export default async function TodoDetailSuspense({
  children,
  params,
}: TodoDetailSuspenseProps) {
  return (
    <Suspense fallback={<div>상세 페이지 로딩 중...</div>}>{children}</Suspense>
  );
}
