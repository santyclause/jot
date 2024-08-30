import { AppState } from "../AppState.js";
import { Note } from "../models/Note.js";
import { Category } from "../models/Category.js";

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

    if (newNote.category != '' && categories.find((category) => newNote.category == category.name) == undefined) {
      const newCategory = new Category({ name: newNote.category });
      categories.push(newCategory);
    }
    AppState.notes.push(newNote);
  }

  updateBody(areaContent) {
    AppState.activeNote.body = areaContent;
    AppState.emit('notes');
  }
}

export const notesService = new NotesService();