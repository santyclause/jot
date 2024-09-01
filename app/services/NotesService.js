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
    let idToString = newNote.id.toString()

    if (newNote.color == "#999999") {
      newNote.color = '#' + idToString.substring(idToString.length - 6);
    }

    if (newNote.category != '' && categories.find((category) => newNote.category.toLowerCase() == category.name.toLowerCase()) == undefined) {
      const newCategory = new Category({ name: newNote.category });
      categories.push(newCategory);
    }
    AppState.notes.push(newNote);

    this.saveNotes();
    this.setActiveNote(newNote.id);
  }

  deleteNote() {
    const notes = AppState.notes;
    const categories = AppState.categories;
    let selectedIndex = notes.findIndex((note) => note.id == AppState.activeNote.id);

    const notesOfSameCategory = notes.filter((note) => note.category.toLowerCase() == notes[selectedIndex].category.toLowerCase());
    if (notesOfSameCategory.length == 1) {
      let categoryIndex = categories.findIndex((category) => category.name.toLowerCase() == notes[selectedIndex].category.toLowerCase());
      categories.splice(categoryIndex, 1);
    }

    notes.splice(selectedIndex, 1);

    this.saveNotes()
    AppState.activeNote = null;
  }

  updateBody(areaContent) {
    AppState.activeNote.body = areaContent;
    AppState.activeNote.updatedAt = new Date();
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

    AppState.categories = categoriesFromStorage;
    AppState.notes = notesFromStorage;
  }
}

export const notesService = new NotesService();