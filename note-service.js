const fs = require("fs").promises;
const path = require("path");

function createNewNote(body, existingNotes) {
  const newNote = body;
  if (!Array.isArray(existingNotes)) existingNotes = [];

  const id = existingNotes.length + 1;
  existingNotes.push({ ...newNote, id, created_at: new Date() });

  fs.writeFile(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(existingNotes, null, 2)
  );

  return newNote;
}

async function getallNotes() {
  const result = await fs.readFile("./db/db.json");
  return JSON.parse(result);
}

async function deleteNote(id) {
  const notesArray = await getallNotes();
  const remainingNotes = notesArray.filter((note) => note.id !== Number(id));

  return fs.writeFile(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(remainingNotes, null, 2)
  );
}

module.exports = { createNewNote, deleteNote, getallNotes };
