import { generateId } from "../utils/GenerateId.js"
import { AppState } from "../AppState.js";

export class Category {
  constructor(data) {
    this.id = data.id || generateId();
    this.name = data.name;
  }

  get containedNotes() {
    const notes = AppState.notes;
    let containedNotes = []
    notes.forEach((note) => {
      if (note.category == this.name) {
        containedNotes.push(note)
      }
    })
    return containedNotes;
  }

  get containedNotesHTML() {
    const notes = this.containedNotes;
    let noteHTMLCont = '';
    notes.forEach((note) => noteHTMLCont += note.categorizedHTMLTemplate);
    return noteHTMLCont;
  }

  get HTMLTemplate() {
    return `
              <div class="col-12">
                <div class="category-cont">
                  <div class="category" role="button">
                    <h5>
                      <i class="mdi mdi-folder"></i>
                      <span>${this.name}</span>
                    </h5>
                  </div>
                  ${this.containedNotesHTML}
                </div>
              </div>
    `
  }
}