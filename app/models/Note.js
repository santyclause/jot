import { generateId } from "../utils/GenerateId.js";

export class Note {
  constructor(data) {
    this.id = data.id || generateId();
    this.category = data.category || '';
    this.name = data.name;
    this.color = data.color;
    this.body = data.body || '';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || this.createdAt;
  }

  get createdAtDate() {
    return this.createdAt.getDate();
  }

  get categorizedHTMLTemplate() {
    return `
                  <div class="categorized-note" style="border-left: 2px solid ${this.color}" role="button">
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
                <div class="uncategorized-note" style="border-left: 2px solid ${this.color}" role="button">
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
          <section class="row my-3">
            <div class="col-1">
              <div style="background-color: ${this.color}"></div>
            </div>
            <div class="col-md-9">
              <div>
                <h3>${this.name}</h3>
                <p>${this.createdAtDate}</p>
                <p>Last updated time</p>
              </div>
            </div>
            <div class="col-md-1 align-self-end">
              <button class="btn-delete"><i class="mdi mdi-delete-outline"></i> Delete</button>
            </div>
            <div class="col-md-1 align-self-end">
              <button class="btn-save"><i class="mdi mdi-floppy"></i>Save</button>
            </div>
          </section>
          <div class="text-cont col-flex pb-4 px-4">
            <textarea class="w-100 note-input" placeholder="Jot down your note here..."></textarea>
          </div>
    `
  }
}