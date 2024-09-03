import { AppState } from "../AppState.js";
import { notesService } from "../services/NotesService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";

export class NotesController {
  constructor() {
    AppState.on('activeNote', this.drawActiveNote, this);
    AppState.on('notes', this.drawNoteList);
    this.drawNoActiveNotes();
    notesService.loadNotes();
  }

  setActiveNote(selectedId) {
    notesService.setActiveNote(selectedId);
  }

  createNote() {
    event.preventDefault();
    const newNoteForm = event.target;
    const noteData = getFormData(newNoteForm);
    notesService.createNote(noteData);
    newNoteForm.reset()
    Pop.toast("Note Created!");
  }

  deleteNote() {
    let wantsToDelete = window.confirm("Are you sure you want to delete this note?");
    if (wantsToDelete) {
      notesService.deleteNote();
      Pop.toast("Note Deleted!");
    }
  }

  updateBody() {
    const noteTextArea = document.getElementById('note-text-area')
    const noteTextCont = noteTextArea.value;
    notesService.updateBody(noteTextCont);
    this.drawActiveNote()
  }

  drawNoteList() {
    const noteListElem = document.getElementById('note-list');
    const jotCountElem = document.getElementById('jot-count');
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
    jotCountElem.innerText = notes.length + ' notes';
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