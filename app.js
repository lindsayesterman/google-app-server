const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('common'));
app.use(cors());

const googleApps = require('./google-play-apps.js');

app.get('/apps', (req, res) => {
  const { search = "", genre = ""} = req.query;

  let resultsApp = googleApps
  .filter(googleApp => 
    googleApp
    .App
    .toLowerCase()
    .includes(search.toLowerCase()));

    let resultsCat = resultsApp
    .filter(googleApp => 
    googleApp
    .Category
    .toLowerCase()
    .includes(genre.toLowerCase()));

  res
  .json(resultsCat);
});


module.exports = app;


app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});