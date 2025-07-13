'use client';

import { Editor } from '@/components/Editor';
import { useNoteStore } from '@/lib/store/noteStore';
import { ArrowLeft, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import '../../page.scss';

export default function NewNotePage() {
  const router = useRouter();
  const { addNote } = useNoteStore();
  const [title, setTitle] = useState('');

  const handleBack = () => {
    router.push('/notes');
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('请输入笔记标题');
      return;
    }

    addNote({
      title: title.trim(),
      content: '',
    });

    router.push('/notes');
  };

  return (
    <div className="notes-page">
      <div className="notes-page-header">
        <div className="flex items-center gap-4">
          <button onClick={handleBack} className="icon-button" title="返回">
            <ArrowLeft size={20} />
          </button>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="请输入笔记标题"
            className="title-input"
          />
        </div>
        <div className="actions">
          <button onClick={handleSave} className="primary-button" title="保存">
            <Save size={20} />
            保存
          </button>
        </div>
      </div>
      <div className="notes-page-content">
        <Editor />
      </div>
    </div>
  );
}