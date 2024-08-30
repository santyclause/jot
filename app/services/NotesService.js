import { AppState } from "../AppState.js";

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
}

export const notesService = new NotesService();