'use client';

import { useNoteStore } from '@/lib/store/noteStore';
import { PlusCircle, Trash2 } from 'lucide-react';
import './style.scss';

export function NoteList() {
  const { notes, currentNote, addNote, deleteNote, setCurrentNote } = useNoteStore();

  const handleAddNote = () => {
    addNote({
      title: '新建笔记',
      content: '',
    });
  };

  const handleDeleteNote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteNote(id);
  };

  return (
    <div className="note-list">
      <div className="note-list-header">
        <h2>笔记列表</h2>
        <button onClick={handleAddNote} title="新建笔记">
          <PlusCircle size={20} />
        </button>
      </div>
      <div className="note-list-content">
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => setCurrentNote(note)}
            className={`note-item ${currentNote?.id === note.id ? 'active' : ''}`}
          >
            <div className="note-item-content">
              <h3>{note.title}</h3>
              <p>{new Date(note.updatedAt).toLocaleString()}</p>
            </div>
            <div className="note-item-actions">
              <button
                onClick={(e) => handleDeleteNote(note.id, e)}
                title="删除笔记"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}