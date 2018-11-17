const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT||5000;

//Define middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(routes);

//Serve up static assets (heroku)
if (process.env.NODE_ENV === "production"){
    app.use(express.static("client/build"))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

//Connect to database
const db = require('./config/key').mongoURI;

mongoose
    .connect(db)
    .then(() => console.log('Mongo DB connected'))
    .catch(err => console.log(err));

// Start the API server
app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });
  