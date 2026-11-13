'use client';

import { ChangeEvent, useState } from 'react';
import { TodoItemList } from '@/types/type';
import TodoItem from '@/components/TodoItem';
import Image from 'next/image';
import CustomButton from '@/components/CustomButton';

interface TodoDetailClientProps {
  initialTodo: TodoItemList;
}

export default function TodoDetailClient({
  initialTodo,
}: TodoDetailClientProps) {
  const [todo, setTodo] = useState(initialTodo);

  const { id } = todo;
  console.log(todo);

  const updateTodoCheckbox = (id: number, isCompleted: boolean) => {
    setTodo((prev) => ({ ...prev, isCompleted }));
  };

  const updateTodoMemo = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTodo((prev) => ({ ...prev, memo: e.target.value }));
  };

  const updateTodoName = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo((prev) => ({ ...prev, name: e.target.value }));
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-50">
      <div className="w-full flex-1 max-w-300 mx-auto bg-white px-[102px] ">
        {/* 할 일 */}
        <div className="py-6">
          <TodoItem
            key={id}
            item={todo}
            type={todo.isCompleted ? 'DONE' : 'TODO'}
            variant="DETAIL"
            onToggle={updateTodoCheckbox}
            onChangeName={updateTodoName}
          />
        </div>
        {/* 이미지 및 텍스트 */}
        <div className="grid grid-cols-[2fr_3fr] gap-4 ">
          <div className="h-[311px] relative flex justify-center items-center bg-slate-50 rounded-2xl border-slate-300 border-2 border-dashed">
            {/* 이미지 추가 버튼 */}
            <div className="absolute right-4 bottom-4 flex justify-center items-center bg-slate-200 rounded-full w-16 h-16">
              <Image
                src={'/images/image-plus.svg'}
                width={24}
                height={24}
                alt="image-plus"
              />
            </div>

            <Image
              src={'/images/img.svg'}
              width={64}
              height={64}
              alt="select image"
            />
          </div>

          <div className="h-[311px] rounded-2xl bg-[url('/images/memo.png')] bg-cover bg-center flex flex-col items-center p-4">
            <span className="text-amber-800">Memo</span>
            <textarea
              name=""
              id=""
              className="flex-1 w-full p-2 resize-none outline-none"
              onChange={updateTodoMemo}
            ></textarea>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex justify-end pt-6">
          <div className="flex gap-4">
            <CustomButton label="수정 완료" />
            <CustomButton label="삭제하기" />
          </div>
        </div>
      </div>
    </div>
  );
}
