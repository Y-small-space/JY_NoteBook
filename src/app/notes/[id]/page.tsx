'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input, Button, Space } from 'antd';
import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import dynamic from 'next/dynamic';
import { useNoteStore } from '@/lib/store/noteStore';
import styles from './page.module.scss';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

export default function EditNotePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { notes, currentNote, setCurrentNote, updateNote } = useNoteStore();

  useEffect(() => {
    const note = notes.find((n) => n.id === params.id);
    if (note) {
      setCurrentNote(note);
    } else {
      router.push('/notes');
    }
  }, [params.id, notes, setCurrentNote, router]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentNote) {
      updateNote(currentNote.id, {
        ...currentNote,
        title: e.target.value,
      });
    }
  };

  const handleContentChange = (value: string | undefined) => {
    if (currentNote) {
      updateNote(currentNote.id, {
        ...currentNote,
        content: value || '',
      });
    }
  };

  const handleSave = () => {
    router.push('/notes');
  };

  if (!currentNote) return null;

  return (
    <div className={styles.container}>
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
            onClick={handleSave}
          >
            保存
          </Button>
        </Space>
        <Input
          className={styles.titleInput}
          value={currentNote.title}
          onChange={handleTitleChange}
          placeholder="请输入标题"
          size="large"
        />
      </div>
      <div className={styles.editor}>
        <MDEditor
          value={currentNote.content}
          onChange={handleContentChange}
          height={600}
          preview="live"
        />
      </div>
    </div>
  );
}