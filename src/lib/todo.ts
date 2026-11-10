import { TodoItem, TodoItemList } from '@/types/type';

const tenantId = 'changhan-todo';
export const BASE_URL = `https://assignment-todolist-api.vercel.app/api/${tenantId}`;

// 할 일 추가
export async function addTodo(data: Pick<TodoItem, 'name'>) {
  const res = await fetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Todo 추가 실패');
  }

  return res.json();
}

// 할 일 조회
export async function getTodos(): Promise<TodoItemList[]> {
  const res = await fetch(`${BASE_URL}/items`);

  if (!res.ok) {
    throw new Error('Todo 조회 실패');
  }

  return res.json();
}

// 할 일 수정
export async function updateTodo(
  itemId: number,
  isCompleted: boolean,
): Promise<TodoItem> {
  const res = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ isCompleted }),
  });

  if (!res.ok) {
    throw new Error('Todo 수정 실패');
  }

  return res.json();
}
