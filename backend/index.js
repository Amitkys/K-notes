const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const Notes = require('./db/db.js');

const app = express();
app.use(cors());

// Middleware to parse application/json
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

mongoose.connect('mongodb://localhost:27017/note')
.then(() => {console.log('connected to db')}).catch((e) => console.log('error to connect db', e));

app.post('/note', async(req, res) => {
    const newNote = {title: req.body.title, note: req.body.note};
    const createdNote = await Notes.create(newNote);
    // console.log(createdNote);
    res.json({msg: 'notes created', noteId: createdNote._id});
})
app.put('/note/:id', async(req, res) => {
    const id = req.params.id;
    const newNote = {title: req.body.title, note: req.body.note};
    const updatedNote = await Notes.findByIdAndUpdate(id, newNote);
    res.json({msg: 'Note Updated'});
})
app.get("/note", async(req, res) => {
    const all_note = await Notes.find({});
    res.json({all_note});
});
app.delete("/note/:id", async(req, res) => {
    const id = req.params.id;
    const deletedNote = await Notes.findByIdAndDelete(id);
    res.json({msg: 'notes delete'});
    
})
app.listen(3000, () => {
    console.log('App is listening on port 3000');
});
