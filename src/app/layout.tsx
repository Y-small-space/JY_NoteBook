import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import '../styles/globals.scss';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
});

export const metadata: Metadata = {
  title: 'JY Notebook - Markdown 笔记本',
  description: '一个简洁的 Markdown 笔记应用',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={geist.variable}>{children}</body>
    </html>
  );
}
