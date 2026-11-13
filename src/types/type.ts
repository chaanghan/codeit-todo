export type TodoItemType = {
  id: number;
  tenantId: string;
  name: string;
  memo: string;
  imageUrl: string;
  isCompleted: boolean;
};

export type TodoItemList = Pick<TodoItemType, 'id' | 'isCompleted' | 'name'>;
