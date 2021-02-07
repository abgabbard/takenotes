var fs = require("fs");
var path = require("path");
var notes = require("../db/db.json");
// const bodyParser = require("body-parser")
const crypto = require("crypto");

function generateUniqueID() {
  return crypto.randomBytes(8).toString('hex') 
} 

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    res.json(notes);
  });
  app.post("/api/notes", function (req, res) {
    const file = path.join(__dirname,"../db/db.json");
    const newNote = req.body;

    newNote.id = generateUniqueID();

    notes.push(newNote);

    fs.writeFile(file,JSON.stringify(notes, null, 4) ,err => {
        if (err) throw err;
        console.log("note saved!");
    });
    res.send(newNote);
});
  app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;
  const file = path.join(__dirname, "../db/db.json");

  for(const note of notes) {
    if (id === note.id) {
      const index = notes.indexOf(note);
      notes.splice(index, 1);
      fs.writeFile(file, JSON.stringify(notes, null, 4), err => {
        if (err) throw err;
        console.log("Your note was deleted.");
      })
      res.end();
    }
  }
});
};