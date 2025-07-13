'use client';

import { useNoteStore } from '@/lib/store/noteStore';
import { Edit2, Plus, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import '../page.scss';

export default function NotesPage() {
  const { notes, deleteNote } = useNoteStore();
  const router = useRouter();

  const handleCreateNote = () => {
    router.push('/notes/new');
  };

  const handleEditNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/notes/${id}`);
  };

  const handleDeleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNote(id);
  };

  return (
    <div className="notes-page">
      <div className="notes-page-header">
        <h1>我的笔记</h1>
        <div className="actions">
          <button
            onClick={handleCreateNote}
            className="primary-button"
            title="新建笔记"
          >
            <Plus size={20} />
            新建笔记
          </button>
        </div>
      </div>
      <div className="notes-page-content">
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className="meta">
              <span>{new Date(note.updatedAt).toLocaleString()}</span>
              <div className="actions">
                <button
                  onClick={(e) => handleEditNote(note.id, e)}
                  title="编辑笔记"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={(e) => handleDeleteNote(note.id, e)}
                  title="删除笔记"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}