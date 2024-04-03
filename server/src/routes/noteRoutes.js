const express = require('express');
const notes = require('../controller/noteController');
const noteRoutes = express.Router();

noteRoutes.post('/login', notes.saveNotes);
noteRoutes.get('/getNotes', notes.getNotes)
noteRoutes.delete('/deleteNote', notes.deleteNotes)
noteRoutes.patch('/updateNotes', notes.updateNotes)
noteRoutes.post('/signup', notes.signup)
noteRoutes.get('/login', notes.login)

module.exports = noteRoutes;