import { AppState } from "../AppState.js";
import { notesService } from "../services/NotesService.js";

export class NotesController {


  drawNoteList() {
    const noteListElem = document.getElementById('note-list');
    const categories = AppState.categories;
    const notes = AppState.notes;


  }
}