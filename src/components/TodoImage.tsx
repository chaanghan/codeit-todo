'use client';

import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

interface TodoImageProps {
  imageUrl: string | null;
  selectedImage: File | null;
  onImageChange: (file: File) => void;
}

/**
 * 할 일 상세 페이지에서 이미지를 표시하고 변경하는 컴포넌트
 *
 * 기존 이미지를 표시하거나 새 이미지를 선택해 미리보기 가능
 * 선택한 이미지 파일은 유효성 검사 후 부모 컴포넌트에 전달
 * 실제 서버 업로드는 /lib/todos.ts 경로의 uploadImage 함수에서 실행
 */
export default function TodoImage({
  imageUrl,
  selectedImage,
  onImageChange,
}: TodoImageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // 미리보기 URL이 변경되거나 컴포넌트가 언마운트되면 이전 Object URL을 해제
  useEffect(() => {
    if (!previewUrl) return;

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // 이미지 파일 선택 시
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 선택할 수 있습니다.');
      e.target.value = '';
      return;
    }

    // 확장자를 제외한 파일 이름이 영문 알파벳으로만 구성되었는지 검사
    const nameWithoutExtension = file.name.slice(0, file.name.lastIndexOf('.'));

    if (!/^[a-zA-Z]+$/.test(nameWithoutExtension)) {
      alert('파일 이름은 영문 알파벳만 사용할 수 있습니다.');
      e.target.value = '';
      return;
    }

    // 이미지 파일 크기를 최대 5MB로 제한
    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      alert('이미지 크기는 5MB 이하여야 합니다.');
      e.target.value = '';
      return;
    }

    const url = URL.createObjectURL(file);

    onImageChange(file);
    setPreviewUrl(url);
  };

  // 새로 선택한 이미지가 있으면 미리보기를 우선 표시하고, 없으면 기존 이미지를 표시
  const displayUrl = selectedImage ? previewUrl : imageUrl;
  const hasImage = Boolean(displayUrl);

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="sr-only"
        tabIndex={-1}
      />

      {displayUrl ? (
        <Image
          src={displayUrl}
          alt="Todo 이미지 미리보기"
          className="h-full w-full object-cover rounded-2xl"
          fill
        />
      ) : (
        <Image src={'/images/img.svg'} width={64} height={64} alt="" />
      )}

      <div
        onClick={() => inputRef.current?.click()}
        className={`
          absolute right-4 bottom-4 
          flex justify-center items-center 
          ${hasImage ? 'bg-slate-900/50 border-2 border-slate-900' : 'bg-slate-200'} 
          rounded-full w-16 h-16 
          cursor-pointer
          `}
      >
        {hasImage ? (
          <Image
            src={'/images/image-edit.svg'}
            width={24}
            height={24}
            alt="image-edit"
          />
        ) : (
          <Image
            src={'/images/image-plus.svg'}
            width={24}
            height={24}
            alt="image-plus"
          />
        )}
      </div>
    </div>
  );
}
