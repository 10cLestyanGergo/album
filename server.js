const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());


let albums = [];


app.post('/albums', (req, res) => {
  const { band, title, year, genre } = req.body;
  const album = { band, title, year, genre };
  albums.push(album);
  res.json(album);
});


app.get('/albums', (req, res) => {
  res.json(albums);
});


app.get('/albums/:index', (req, res) => {
  const index = parseInt(req.params.index) - 1; 
  if (index < 0 || index >= albums.length) {
    return res.status(404).json({ error: 'Nem található ilyen album!' });
  }
  res.json(albums[index]);
});


app.put('/albums/:index', (req, res) => {
  const index = parseInt(req.params.index) - 1;
  if (index < 0 || index >= albums.length) {
    return res.status(404).json({ error: 'Nem található ilyen album!' });
  }
  const { band, title, year, genre } = req.body;
  albums[index] = { band, title, year, genre }; 
  res.json(albums[index]);
});


app.delete('/albums/:index', (req, res) => {
  const index = parseInt(req.params.index) - 1;
  if (index < 0 || index >= albums.length) {
    return res.status(404).json({ error: 'Nem található ilyen album!' });
  }
  albums.splice(index, 1);
  res.json({ message: 'Album törölve' });
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server on port 3000`);
});
