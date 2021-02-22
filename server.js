// boiler plate code from actvitity 14-FinalStarWarsApp
var express = require("express");
var path = require("path");
const data = require("./db/db");
// const e = require("express");

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
app.get("/api/notes", function(req, res) {
 res.json(data);
});

app.post("/api/notes", function(req, res) {
    var newNote = req.body;

    // Using a RegEx Pattern to remove spaces from newNote
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newNote.title = newNote.title.replace(/\s+/g, "").toLowerCase();
  
    console.log(newNote);
  
    data.push(newNote);
  
    res.json(newNote);
  });
  

app.delete("/api/notes/:id", function (req, res, err) {
    var deleteNote = () => req.params.id;
    var id = data
   
    deleteNote(id);
    console.log("note deleted" + JSON.stringify(data. null)
        );
        res.send("note deleted" + JSON.stringify(data. null)
        );
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
