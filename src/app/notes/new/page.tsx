'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout, Input, Button, Space } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { useNoteStore } from '@/lib/store/noteStore';
import styles from './page.module.scss';

const { Content } = Layout;

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

export default function NewNotePage() {
  const router = useRouter();
  const { addNote } = useNoteStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    addNote({
      title: title.trim(),
      content: content || '',
    });

    router.push('/notes');
  };

  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        <form onSubmit={handleSave}>
          <div className={styles.header}>
            <Space>
              <Button
                icon={<ArrowLeftOutlined />}
                onClick={() => router.push('/notes')}
              >
                返回
              </Button>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                htmlType="submit"
              >
                保存
              </Button>
            </Space>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.titleInput}
              placeholder="请输入标题"
              size="large"
              required
            />
          </div>
          <div className={styles.editor}>
            <MDEditor
              value={content}
              onChange={(value) => setContent(value || '')}
              height={600}
              preview="live"
            />
          </div>
        </form>
      </Content>
    </Layout>
  );
}