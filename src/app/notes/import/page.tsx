'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, message, Typography } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useNoteStore } from '@/lib/store/noteStore';
import styles from './page.module.scss';

const { Dragger } = Upload;
const { Title } = Typography;

export default function ImportPage() {
  const router = useRouter();
  const { addNote } = useNoteStore();
  const [loading, setLoading] = useState(false);

  const handleImport = async (file: File) => {
    setLoading(true);
    try {
      const text = await file.text();
      const title = file.name.replace(/\.md$/, '');

      addNote({
        title,
        content: text,
      });

      message.success('笔记导入成功');
      router.push('/notes');
    } catch {
      message.error('笔记导入失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Title level={2}>导入笔记</Title>
      <p className={styles.description}>
        支持导入 Markdown 格式的笔记文件（.md）
      </p>
      <Dragger
        accept=".md"
        showUploadList={false}
        beforeUpload={(file) => {
          handleImport(file);
          return false;
        }}
        disabled={loading}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          点击或拖拽 Markdown 文件到此区域
        </p>
        <p className="ant-upload-hint">
          仅支持单个文件上传，文件名将作为笔记标题
        </p>
      </Dragger>
    </div>
  );
}