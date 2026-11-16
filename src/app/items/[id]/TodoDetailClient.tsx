'use client';

import { ChangeEvent, useState } from 'react';
import { TodoItemType } from '@/types/type';
import TodoItem from '@/components/TodoItem';
import CustomButton from '@/components/CustomButton';
import TodoImage from '@/components/TodoImage';
import { updateTodo, uploadImage } from '@/lib/todo';
import { useRouter } from 'next/navigation';

interface TodoDetailClientProps {
  initialTodo: TodoItemType;
}

export default function TodoDetailClient({
  initialTodo,
}: TodoDetailClientProps) {
  const [todo, setTodo] = useState(initialTodo);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { id } = todo;
  const router = useRouter();

  // 메모, 이름, 완료 여부, 이미지의 변경 여부
  const isChange =
    (todo.memo ?? '') !== (initialTodo.memo ?? '') ||
    todo.name !== initialTodo.name ||
    todo.isCompleted !== initialTodo.isCompleted ||
    selectedImage !== null;

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

  // 최종 할 일 수정
  const saveTodo = async () => {
    try {
      let imageUrl = todo.imageUrl ?? '';

      // 이미지 업로드
      if (selectedImage) {
        imageUrl = await uploadImage(selectedImage);
      }

      // 할 일 수정
      await updateTodo(todo.id, {
        name: todo.name,
        memo: todo.memo ?? '',
        imageUrl,
        isCompleted: todo.isCompleted,
      });
    } catch (error) {
      console.error('할 일 수정 실패', error);
      alert('실패했습니다. 다시 시도해 주세요.');
    } finally {
      router.replace('/'); // 홈으로 이동
    }
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
          <div
            className={`
              h-[311px] rounded-2xl relative 
              flex justify-center items-center 
              bg-slate-50  
              ${selectedImage || todo.imageUrl ? '' : 'border-slate-300 border-2 border-dashed'}`}
          >
            <TodoImage
              imageUrl={todo.imageUrl}
              onImageChange={setSelectedImage}
              selectedImage={selectedImage}
            />
          </div>

          {/* 메모 */}
          <div
            className="
            h-[311px] p-4
            rounded-2xl bg-[url('/images/memo.png')] bg-cover bg-center 
            flex flex-col items-center"
          >
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
            <CustomButton
              label="수정 완료"
              isActive={isChange}
              onClick={saveTodo}
            />
            <CustomButton label="삭제하기" />
          </div>
        </div>
      </div>
    </div>
  );
}
