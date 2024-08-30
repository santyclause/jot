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
}