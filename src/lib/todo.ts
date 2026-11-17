import { TodoItemType, TodoItemList } from '@/types/type';

const tenantId = 'changhan-todo';
export const BASE_URL = `https://assignment-todolist-api.vercel.app/api/${tenantId}`;

type AddTodoRequestType = Pick<TodoItemType, 'name'>;

// 할 일 추가
export async function addTodo(data: AddTodoRequestType): Promise<TodoItemType> {
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

// 특정 id 조회
export async function getTodo(itemId: number): Promise<TodoItemType> {
  const res = await fetch(`${BASE_URL}/items/${itemId}`);

  if (!res.ok) {
    throw new Error('Todo 조회 실패');
  }

  return res.json();
}

type UpdateTodoRequestType = Partial<
  Pick<TodoItemType, 'name' | 'memo' | 'imageUrl' | 'isCompleted'>
>;

// 할 일 수정
export async function updateTodo(
  itemId: number,
  data: UpdateTodoRequestType,
): Promise<TodoItemType> {
  const res = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Todo 수정 실패');
  }

  return res.json();
}

// 이미지 삭제
export async function deleteTodo(itemId: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Todo 삭제 실패');
  }
}

// 이미지 추가
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData();

  formData.append('image', file);

  const res = await fetch(`${BASE_URL}/images/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    throw new Error('Todo 이미지 업로드 실패');
  }
  const result = await res.json();

  return result.url;
}
