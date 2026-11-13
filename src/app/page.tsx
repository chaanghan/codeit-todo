'use client';

import CustomButton from '@/components/CustomButton';
import Done from '@/components/Done';
import Todo from '@/components/Todo';
import { addTodo, getTodos, updateTodo } from '@/lib/todo';
import { TodoItemList } from '@/types/type';
import { ChangeEvent, useEffect, useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [todos, setTodos] = useState<TodoItemList[]>([]);

  const todoList = todos.filter((todo) => !todo.isCompleted);
  const doneList = todos.filter((todo) => todo.isCompleted);

  const isEmpty = todos.length === 0;

  console.log('todos', todos);

  async function loadTodos() {
    try {
      const data = await getTodos();

      setTodos(data);
    } catch (error) {
      console.error('Todo 조회 실패:', error);
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleUpdateTodo = async (id: number, isCompleted: boolean) => {
    try {
      // 수정 api 요청
      const updatedTodo = await updateTodo(id, { isCompleted });

      // state 수정
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo)),
      );
    } catch (error) {
      console.error('할 일 수정 실패', error);
    }
  };

  const handleAddName = async () => {
    if (!name.trim()) return;
    setName('');

    try {
      await addTodo({ name }); // 추가 api 요청
      await loadTodos(); // 데이터 로드
    } catch (error) {
      console.error('할 일 추가 실패', error);
    }
  };

  useEffect(() => {
    let ignore = false;

    async function fetchTodos() {
      try {
        const data = await getTodos();

        if (!ignore) {
          setTodos(data);
        }
      } catch (error) {
        console.error('Todo 조회 실패:', error);
      }
    }

    fetchTodos();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="mx-auto w-full max-w-300 px-5">
      <div className="w-full py-6">
        <div className="flex gap-4">
          <input
            type="text"
            onChange={onChange}
            value={name}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
                handleAddName();
              }
            }}
            placeholder="할 일을 입력해주세요"
            className="
          h-14
          min-w-0
          flex-1
          rounded-full
          border-2
          border-slate-900
          bg-slate-100
          px-5
          outline-none
          shadow-[3px_4px_0px_#0F172A]
          "
          />
          {/* <AddButton onClick={handleAddName} isEmpty={isEmpty} /> */}
          <CustomButton
            label="추가하기"
            isActive={isEmpty}
            onClick={handleAddName}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 py-4 lg:grid-cols-2">
        <Todo items={todoList} onToggle={handleUpdateTodo} />
        <Done items={doneList} onToggle={handleUpdateTodo} />
      </div>
    </div>
  );
}
