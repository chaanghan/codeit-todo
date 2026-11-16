'use client';

import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

interface TodoImageProps {
  imageUrl: string | null;
  selectedImage: File | null;
  onImageChange: (file: File) => void;
}

export default function TodoImage({
  imageUrl,
  selectedImage,
  onImageChange,
}: TodoImageProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!previewUrl) return;

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  // 이미지 파일 선택 시 실행
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // 이미지 파일 검사
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 선택할 수 있습니다.');
      e.target.value = '';
      return;
    }

    // 파일 이름 검사 (확장자 제외, 영문만 허용)
    const nameWithoutExtension = file.name.slice(0, file.name.lastIndexOf('.'));

    if (!/^[a-zA-Z]+$/.test(nameWithoutExtension)) {
      alert('파일 이름은 영문 알파벳만 사용할 수 있습니다.');
      e.target.value = '';
      return;
    }

    // 파일 크기 검사
    const MAX_FILE_SIZE = 5 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      alert('이미지 크기는 5MB 이하여야 합니다.');
      e.target.value = '';
      return;
    }

    // 파일을 url로 변환
    const url = URL.createObjectURL(file);

    onImageChange(file);
    setPreviewUrl(url);
  };

  // 화면에 표시할 이미지 결정
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

      {/* 이미지 url이 있다면 */}
      {displayUrl ? (
        <Image
          src={displayUrl}
          alt="Todo 이미지 미리보기"
          className="h-full w-full object-cover rounded-2xl"
          fill
        />
      ) : (
        <Image
          src={'/images/img.svg'}
          width={64}
          height={64}
          alt="미리보기 이미지"
        />
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
<div></div>;
