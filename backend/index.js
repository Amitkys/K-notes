const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse application/json
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded



app.listen(3000, () => {
    console.log('App is listening on port 3000');
});
