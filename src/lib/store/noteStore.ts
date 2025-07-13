import { create } from 'zustand';
import { Note, NoteStore } from '../types/note';

export const useNoteStore = create<NoteStore>((set) => ({
  notes: [],
  currentNote: null,
  addNote: (note) => {
    const newNote: Note = {
      ...note,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    set((state) => ({
      notes: [...state.notes, newNote],
      currentNote: newNote,
    }));
  },
  updateNote: (id, updatedNote) => {
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === id
          ? { ...note, ...updatedNote, updatedAt: new Date() }
          : note
      ),
      currentNote:
        state.currentNote?.id === id
          ? { ...state.currentNote, ...updatedNote, updatedAt: new Date() }
          : state.currentNote,
    }));
  },
  deleteNote: (id) => {
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
      currentNote: state.currentNote?.id === id ? null : state.currentNote,
    }));
  },
  setCurrentNote: (note) => {
    set({ currentNote: note });
  },
}));