'use client';

import { ChangeEvent, useState } from 'react';
import { TodoItemType } from '@/types/type';
import TodoItem from '@/components/TodoItem';
import CustomButton from '@/components/CustomButton';
import TodoImage from '@/components/TodoImage';
import { deleteTodo, updateTodo, uploadImage } from '@/lib/todo';
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

  // 할 일 삭제
  const deleteTodoItem = async () => {
    const confirm = window.confirm('정말로 삭제하시겠습니까?');
    if (!confirm) return;

    try {
      await deleteTodo(todo.id);

      router.replace('/');
    } catch (error) {
      console.error('할 일 삭제 실패:', error);
      alert('할 일 삭제에 실패했습니다.');
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-gray-50">
      <div
        className="
      w-full lg:max-w-300 flex-1 
      bg-white  
      mx-auto px-4 md:px-6 lg:px-[102px]"
      >
        {/* 할 일 */}
        <div className="py-4 lg:py-6">
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
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_3fr]">
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
            h-[311px] p-2
            rounded-2xl bg-[url('/images/memo.png')] bg-cover bg-center 
            flex flex-col items-center"
          >
            <span className="text-amber-800">Memo</span>
            <label
              htmlFor="todo-memo"
              className="flex w-full h-full items-center justify-center"
            >
              <textarea
                id="todo-memo"
                value={todo.memo ?? ''}
                onChange={(e) =>
                  setTodo((prev) => ({
                    ...prev,
                    memo: e.target.value,
                  }))
                }
                className="
        field-sizing-content
        min-w-40 min-h-6 max-h-[240px] w-full px-2
        resize-none overflow-y-auto
        bg-transparent text-center outline-none
      "
              />
            </label>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex pb-8 md:justify-center md:pb-8 lg:justify-end pt-6">
          <div className="flex w-full justify-between md:justify-center lg:justify-end  gap-4">
            <CustomButton
              label="수정 완료"
              isActive={isChange}
              onClick={saveTodo}
            />
            <CustomButton label="삭제하기" onClick={deleteTodoItem} />
          </div>
        </div>
      </div>
    </div>
  );
}
