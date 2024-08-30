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

  get categorizedHTMLTemplate() {
    return `
                  <div class="categorized-note" style="border-left: 2px solid ${this.color}">
                    <p>
                      <i class="mdi mdi-note"></i>
                      <span>${this.name}</span>
                    </p>
                    <p>${this.body.slice(0, 30)}...</p>
                  </div>
    `
  }

  get uncategorizedHTMLTemplate() {
    return `
              <div class="col-12">
                <div class="uncategorized-note" style="border-left: 2px solid ${this.color}">
                  <p>
                    <i class="mdi mdi-note"></i>
                    <span>${this.name}</span>
                  </p>
                  <p>
                    ${this.body.slice(0, 30)}...
                  </p>
                </div>
              </div>
    `
  }
}