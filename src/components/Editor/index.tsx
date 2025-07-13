'use client';

import dynamic from 'next/dynamic';
import { useCallback } from 'react';
import { useNoteStore } from '@/lib/store/noteStore';
import './style.scss';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
);

export function Editor() {
  const { currentNote, updateNote } = useNoteStore();

  const handleChange = useCallback(
    (value?: string) => {
      if (currentNote && value !== undefined) {
        updateNote(currentNote.id, { content: value });
      }
    },
    [currentNote, updateNote]
  );

  if (!currentNote) {
    return (
      <div className="editor-empty">
        选择或创建一个笔记开始编辑
      </div>
    );
  }

  return (
    <div className="editor">
      <MDEditor
        value={currentNote.content}
        onChange={handleChange}
        height="100%"
        preview="edit"
        hideToolbar={false}
        enableScroll={true}
      />
    </div>
  );
}