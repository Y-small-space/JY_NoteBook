'use client';

import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm';
import remarkSlug from 'remark-slug';
import rehypeHighlight from 'rehype-highlight';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './page.module.scss';
import '@/styles/markdown.scss'; // 引入自定义Markdown样式
import { getNoteBook } from '@/services/githubService';

export default function NotesPage() {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<string>();
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const { theme } = useTheme();

  // 根据主题动态加载代码高亮样式
  useEffect(() => {
    const prevStyle = document.getElementById('highlight-style');
    if (prevStyle) {
      prevStyle.remove();
    }
    const style = document.createElement('link');
    style.id = 'highlight-style';
    style.rel = 'stylesheet';
    style.href =
      theme === 'dark'
        ? '/highlight-dark.css'
        : 'highlight.js/styles/github.css';
    document.head.appendChild(style);
  }, [theme]);

  const getNoteBookData = async () => {
    setLoading(true);
    const res = await getNoteBook();
    setNotes(res);
    setLoading(false);
  };

  useEffect(() => {
    getNoteBookData();
  }, []);

  // 点击导航项滚动到对应位置
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loadingContainer}>
          <Spin size="large" />
          <p>正在从GitHub获取笔记...</p>
        </div>
      ) : (
        <div className={styles.contentWrapper}>
          {/* 左侧导航栏 */}
          {headings.length > 0 && (
            <div className={styles.sidebar}>
              <div className={styles.tocTitle}>目录</div>
              <nav className={styles.toc}>
                {headings.map(({ id, text }) => (
                  <div
                    key={id}
                    className={styles.tocItem}
                    onClick={() => scrollToHeading(id)}
                  >
                    {text}
                  </div>
                ))}
              </nav>
            </div>
          )}

          {/* 右侧内容区 */}
          <div className={styles.mainContent}>
            <div className="markdown-content">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkSlug]}
                rehypePlugins={[rehypeHighlight]}
                // 自定义组件拦截 h2，收集目录
                components={{
                  h2({ node, children, ...props }) {
                    const id = props.id as string;
                    const text = String(children);

                    // 避免重复添加
                    setHeadings((prev) => {
                      if (!prev.find((h) => h.id === id)) {
                        return [...prev, { id, text }];
                      }
                      return prev;
                    });

                    return (
                      <h2 id={id} {...props}>
                        {children}
                      </h2>
                    );
                  },
                }}
              >
                {notes}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}