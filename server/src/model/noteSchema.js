const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title : {
        type : String
    },
    note : {
        type : String
    },
    bg : {
        type : String
    }
});

module.exports = mongoose.model('Note',NoteSchema)