const express = require('express');
const path = require('path');
router = express.Router();
const app = express();
const port = process.env.PORT || '3000';
var mongo = require("./db")
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/dashboard.html'));
});


var auth = require('./auth');
app.use('/auth', auth);
// Endpoint diproteksi oleh jwt

var api = require('./api');
app.use('/api', api);

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});