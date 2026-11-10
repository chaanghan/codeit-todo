export type TodoItem = {
  id: number;
  tenantId: string;
  name: string;
  memo: string;
  imageUrl: string;
  isCompleted: boolean;
};

export type TodoItemList = Pick<TodoItem, 'id' | 'isCompleted' | 'name'>;
