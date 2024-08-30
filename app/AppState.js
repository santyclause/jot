import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'
import { Note } from './models/Note.js'
import { Category } from './models/Category.js'

class ObservableAppState extends EventEmitter {

  categories = [
    new Category({
      name: "Sorted Examples"
    })
  ]

  notes = [
    new Note({
      name: "Example Note",
      category: "Sorted Examples",
      color: "#5892f2"
    }),
    new Note({
      name: "Example Note 2",
      color: "#10faa3"
    })
  ]

  activeNote = null;
}

export const AppState = createObservableProxy(new ObservableAppState())