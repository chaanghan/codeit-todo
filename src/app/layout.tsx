import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import localFont from 'next/font/local';

const nanumSquare = localFont({
  src: [
    {
      path: '../fonts/NanumSquareR.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/NanumSquareB.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/NanumSquareEB.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Todo List',
  description: '할 일 목록을 관리하는 To Do 서비스',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="ko" className={`${nanumSquare.className} h-full antialiased`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        {children}
      </body>
    </html>
  );
}
