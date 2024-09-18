const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse application/json
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/kys', (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    console.log(name, phone);
    res.send('Data received');
})

app.listen(3000, () => {
    console.log('App is listening on port 3000');
});
