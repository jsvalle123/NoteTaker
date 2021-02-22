// boiler plate code from actvitity 14-FinalStarWarsApp
var express = require("express");
var path = require("path");
const Database = require('./data/db');
const e = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });


// Displays all characters
app.get("/api/note", function(req, res) {
 const e = new Database();
 res.json(e.getNotes());
});

app.post("/api/note", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newNote = req.body;

  // Using a RegEx Pattern to remove spaces from newNote
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  if (!newNote.id) {
      newNote.id = id();
  }
  try {
      e.saveNote(newNote);
      res.json(newNote);
  }
  catch (error) {
      switch (error.message.toLowerCase()) {
          case "notfound":
          res.sendStatus(404);
          break;
          case "invalidparameter":
              res.sendStatus(403);
              break;
              default:
                  res.sendStatus(402);

      }
  }
});

app.delete("/api/notes/:id", function (req, res, err) {
    const e = new Database();
    var id = req.params.id;
e.deleteNote(id)
res.sendStatus(302)
})
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
