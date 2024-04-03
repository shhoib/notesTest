const express = require('express');
const app = express();
const http = require('http')
const cors = require('cors')
const server = http.createServer(app)


app.use(cors()); 
app.use(express.json())
app.use(express.urlencoded({ limit: "30mb", extended: true }));
const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost:27017/noteTest')
  const db= mongoose.connection;

const noteRoutes = require('./src/routes/noteRoutes');
app.use('/',noteRoutes)


server.listen(3000,()=>console.log('server started'))