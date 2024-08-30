import { generateId } from "../utils/GenerateId.js";

export class Note {
  constructor(data) {
    this.id = data.id || generateId();
    this.name = data.name;
    this.body = data.body || '';
    this.color = data.color;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt;
    this.category = data.category || '';
  }
}