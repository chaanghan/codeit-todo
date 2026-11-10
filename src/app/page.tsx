'use client';

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
      // 1. 수정 api 요청
      const updatedTodo = await updateTodo(id, isCompleted);

      // 2. state 수정
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
      await addTodo({ name }); // 1. 추가 api dycjd
      await loadTodos(); // 2. 데이터 로드
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
    <div>
      <div>
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
        />
        <button onClick={handleAddName}>추가하기</button>
      </div>
      <div className="flex">
        <Todo items={todoList} onToggle={handleUpdateTodo} />
        <Done items={doneList} onToggle={handleUpdateTodo} />
      </div>
    </div>
  );
}
