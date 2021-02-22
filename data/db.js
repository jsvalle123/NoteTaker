var fs = require('fs');
var path = require('path');

class Database {
constructor() {
    this.dbPath = path.json(__dirname, "../db/db.json");
    this.notes = this.readNotes();
}
readNotes() {
    let data = fs.readFileSync(this.dbPath);
    let array = JSON.parse(data);
    if (array == null) {
        array = [];
    }
    return array;
}
saveNote(note) {
    if (note === null) {
    console.log("note is empty");
    throw new Error("InvalidParameter");
}

const index = this.findNoteIndex(note);
if (index === -1) {
    this.notes.push(note);
} else {
    throw new Error("NotFound");
}
fs.readFileSync(this.dbPath, JSON.stringify(this.notes));
}
get Notes() {
    return this.notes;
}
}
module.exports = Database;
