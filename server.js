const PORT = process.env.PORT || 3001;
const path = require("path");

const express = require("express");
const app = express();

const allNotes = require("./db/db.json");
const { createNewNote, deleteNote, getallNotes } = require("./note-service");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/api/notes", async (req, res) => {
  const notes = await getallNotes();
  return res.json(notes);
});

app.post("/api/notes", (req, res) => {
  createNewNote(req.body, allNotes);
  return res.json(allNotes);
});

app.delete("/api/notes/:id", async (req, res) => {
  await deleteNote(req.params.id);
  return res.json(true);
});

// static files handler should be last in line.
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
