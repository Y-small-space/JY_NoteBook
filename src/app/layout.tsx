import { Geist, Geist_Mono } from 'next/font/google';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { ThemeProvider } from '@/contexts/ThemeContext';
import theme from '@/styles/theme';
import '@/styles/globals.scss';
import { Suspense } from 'react';

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
});

export const metadata = {
  title: 'JY Notebook - Markdown 笔记本',
  description: '一个简洁的 Markdown 笔记应用',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable}`}>
        <AntdRegistry>
          <ThemeProvider>
            <ConfigProvider theme={theme}>
              <Suspense>
                {children}
              </Suspense>
            </ConfigProvider>
          </ThemeProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
