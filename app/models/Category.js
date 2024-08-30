import { generateId } from "../utils/GenerateId.js"

export class Category {
  constructor(data) {
    this.id = data.id || generateId();
    this.name = data.name;
  }
}