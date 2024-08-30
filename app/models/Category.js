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
}