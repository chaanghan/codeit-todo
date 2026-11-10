'use client';

import { addTodo, getTodos } from '@/lib/todo';
import { TodoItemList } from '@/types/type';
import { ChangeEvent, useEffect, useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [todos, setTodos] = useState<TodoItemList[]>([]);

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

  const handleAddName = async () => {
    if (!name.trim()) return;
    setName('');

    try {
      await addTodo({ name });
      await loadTodos();
      // 추가 후 다시 조회해서 리렌더링 되어야 함
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
        />
        <button onClick={handleAddName}>추가하기</button>
      </div>
    </div>
  );
}
