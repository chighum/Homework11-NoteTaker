// Import node libraries
const express = require("express");
const path = require("path");
const fs = require("fs");

// Set up port on localhost:3001
const PORT = 3001;

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// ROUTES
// GET Route for homepage
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

// GET Route for Notes Page
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

// GET route for api/notes
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// POST route for api/notes
app.post("/api/notes", (req, res) => {
  const noteInput = req.body;
  // id?
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    let storedNotes = JSON.parse(data);
    storedNotes.push(noteInput);
    fs.writeFile("./db/db.json", JSON.stringify(storedNotes), (err) => {
      res.json(noteInput);
    });
  });
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
