import { generateId } from "../utils/GenerateId.js";

export class Note {
  constructor(data) {
    this.id = data.id || generateId();
    this.category = data.category || '';
    this.name = data.name;
    this.color = data.color;
    this.body = data.body || '';
    this.createdAt = data.createdAt != undefined ? new Date(data.createdAt) : new Date();
    this.updatedAt = data.updatedAt != undefined ? new Date(data.updatedAt) : this.createdAt;
  }

  get createdAtDate() {
    return this.createdAt.toLocaleDateString()
  }

  get updatedAtFullDateAndTime() {
    return this.updatedAt.toLocaleString();
  }

  get categorizedHTMLTemplate() {
    return `
                  <div onclick="app.NotesController.setActiveNote('${this.id}')" class="categorized-note" style="border-left: 2px solid ${this.color}" role="button">
                    <p>
                      <i class="mdi mdi-note"></i>
                      <span>${this.name}</span>
                    </p>
                    <p class="body-preview">
                      ${this.body.slice(0, 30)}...
                    </p>
                  </div>
    `
  }

  get uncategorizedHTMLTemplate() {
    return `
              <div class="col-12">
                <div onclick="app.NotesController.setActiveNote('${this.id}')" class="uncategorized-note" style="border-left: 2px solid ${this.color}" role="button">
                  <p>
                    <i class="mdi mdi-note"></i>
                    <span>${this.name}</span>
                  </p>
                  <p class="body-preview">
                    ${this.body.slice(0, 30)}...
                  </p>
                </div>
              </div>
    `
  }

  get activeNoteHTMLTemplate() {
    return `
          <section class="row my-3 px-4">
            <div class="col-1 d-flex justify-content-end">
              <div class="w-75 h-100 bookmark" style="background-color: ${this.color}"></div>
            </div>
            <div class="col-md-7">
              <div>
                <h3>${this.name}</h3>
                <p>Created on ${this.createdAtDate}</p>
                <p>Last updated on ${this.updatedAtFullDateAndTime}</p>
              </div>
            </div>
            <div class="col-md-2 align-self-end">
              <button class="btn-delete"><i class="mdi mdi-delete"></i> Delete</button>
            </div>
            <div class="col-md-2 align-self-end">
              <button onclick="app.NotesController.updateBody()" class="btn-save"><i class="mdi mdi-floppy"></i> Save</button>
            </div>
          </section>
          <div class="text-cont col-flex pb-4 px-4">
            <textarea id="note-text-area" class="w-100 note-input" placeholder="Jot down your note here...">${this.body}</textarea>
          </div>
    `
  }
}