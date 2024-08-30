import { AppState } from "../AppState.js";
import { Note } from "../models/Note.js";
import { Category } from "../models/Category.js";
import { saveState } from "../utils/Store.js";
import { loadState } from "../utils/Store.js";

class NotesService {


  setActiveNote(selectedId) {
    const notes = AppState.notes;
    const selectedNote = notes.find((note) => note.id == selectedId);

    if (AppState.activeNote === null) {
      AppState.activeNote = selectedNote;
    } else if (AppState.activeNote.id != selectedId) {
      AppState.activeNote = selectedNote;
    } else {
      AppState.activeNote = null;
    }
  }

  createNote(noteData) {
    const newNote = new Note(noteData);
    const categories = AppState.categories;

    if (newNote.category != '' && categories.find((category) => newNote.category.toLowerCase() == category.name.toLowerCase()) == undefined) {
      const newCategory = new Category({ name: newNote.category });
      categories.push(newCategory);
    }
    AppState.notes.push(newNote);

    this.saveNotes();
    this.setActiveNote(newNote.id);
  }

  updateBody(areaContent) {
    AppState.activeNote.body = areaContent;
    AppState.emit('notes');
    this.saveNotes();
  }

  saveNotes() {
    saveState('notes', AppState.notes);
    saveState('categories', AppState.categories);
  }

  loadNotes() {
    const notesFromStorage = loadState('notes', [Note]);
    const categoriesFromStorage = loadState('categories', [Category]);

    AppState.notes = notesFromStorage;
    AppState.categories = categoriesFromStorage;
  }
}

export const notesService = new NotesService();