import { AppState } from "../AppState.js";
import { notesService } from "../services/NotesService.js";

export class NotesController {
  constructor() {
    this.drawNoteList()
  }

  drawNoteList() {
    const noteListElem = document.getElementById('note-list');
    const categories = AppState.categories;
    const notes = AppState.notes;
    let noteCont = '';

    categories.forEach((category) => noteCont += category.HTMLTemplate);
    notes.forEach((note) => {
      if (note.category == '') {
        noteCont += note.uncategorizedHTMLTemplate;
      }
    })

    noteListElem.innerHTML = noteCont;
  }
}