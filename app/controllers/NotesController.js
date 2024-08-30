import { AppState } from "../AppState.js";
import { notesService } from "../services/NotesService.js";

export class NotesController {
  constructor() {
    AppState.on('activeNote', this.drawActiveNote, this);
    this.drawNoteList();
    this.drawNoActiveNotes();
  }

  setActiveNote(selectedId) {
    notesService.setActiveNote(selectedId);
  }

  drawNoteList() {
    const noteListElem = document.getElementById('note-list');
    const categories = AppState.categories;
    const notes = AppState.notes;
    let noteCont = ``;

    categories.forEach((category) => noteCont += category.HTMLTemplate);
    notes.forEach((note) => {
      if (note.category == '') {
        noteCont += note.uncategorizedHTMLTemplate;
      }
    })

    noteListElem.innerHTML = noteCont;
  }

  drawActiveNote() {
    const activeNoteElem = document.getElementById('active-note');
    const activeNote = AppState.activeNote;

    if (AppState.activeNote != null) {
      activeNoteElem.innerHTML = activeNote.activeNoteHTMLTemplate;
    } else {
      this.drawNoActiveNotes();
    }
  }

  drawNoActiveNotes() {
    const activeNoteElem = document.getElementById('active-note');

    activeNoteElem.innerHTML = `
          <div class=" h-100 no-note d-flex justify-content-center align-items-center">
            <p>Create or select a Jot to start Jotting</p>
          </div>`
  }
}