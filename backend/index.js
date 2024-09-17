const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const app = express();
const Notes = require('./models/Notes.js');
require('./auth.js');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'kys', // Secret key for signing the session ID cookie
    resave: false, // Forces the session to be saved back to the session store, even if it was never modified during the request
    saveUninitialized: false, // Forces a session that is "uninitialized" to be saved to the store
    //cookie: { secure: false } // In production, you should set `secure: true` when using HTTPS
    cookie:{
        expires: Date.now() + 3 * 24 * 60 * 60 * 1000,
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true
      }
}));
app.use(passport.initialize());
app.use(passport.session());
// Middleware to parse JSON request bodies (use it if you using axios)
app.use(express.json());

// Async function to connect to MongoDB
async function main() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/auth");
        console.log(`Connected To DB`);

        // Start the server only after successful DB connection
        app.listen(3000, () => {
            console.log('Listening on port 3000');
        });
    } catch (err) {
        console.log(`Error in Connectivity to DB`, err);
    }
}
app.get('/auth/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);
// Middleware to check if the user is authenticated
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

app.get('/kys', (req, res) => {
    res.send({msg: 'msg from Backend'});
})


app.get('/', isLoggedIn, async (req, res) => {
    const allData = await Notes.find({userId: req.user.id});
    
    const isoDate = allData[0].date.toString();

    const time = new Date(isoDate);
    // Format the date as "28 Aug 2024"
    const optionsDate = { day: 'numeric', month: 'short', year: 'numeric' };
    const formattedDate = time.toLocaleDateString('en-GB', optionsDate);
    // Format the time as "11:36PM"
    const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedTime = time.toLocaleTimeString('en-US', optionsTime).replace(' ', '');
    // Combine both date and time
    const formattedDateTime = `${formattedDate}, ${formattedTime}`;
    // console.log(formattedDateTime);

    // console.log(allData);
    res.render('app/index.ejs', {allData, formattedDateTime});
});
app.get('/w/notes', (req, res) => {
    res.render('app/w_notes.ejs');
});
app.get('/v/notes/:userId', async (req, res) => {
    const userId = req.params.userId;
    const allData = await Notes.find({userId});
    // console.log(allData[0].title);
    res.render('app/v_notes.ejs', {allData});
});
app.put('/update-notes', async (req, res) => {
    try {
        const { title, text } = req.body;
        const updatedData = await Notes.updateOne({ userId: req.user.id }, { title, text });
        console.log(updatedData);

        // Send a success response
        res.status(200).json({ message: 'Note updated successfully', updatedData });
    } catch (error) {
        console.error('Error updating note:', error);
        // Send an error response
        res.status(500).json({ message: 'Error updating note', error: error.message });
    }
});


app.get('/login', (req, res) => {
    res.render('login')
});

app.get('/notes', isLoggedIn, (req, res) => {
    res.render('notes.ejs');
});


// Your notes route with authentication check
app.post('/notes',  isLoggedIn, async (req, res) => {
    const newNotes = new Notes({
        text: req.body.notes,
        userId: req.user.id,
    });
    await newNotes.save();
});

app.get('/allnotes', isLoggedIn, async (req, res) => {
    const data = await Notes.find({userId: req.user.id});
    res.render('allnotes.ejs', {data});
})

app.get('/auth/google', 
    passport.authenticate('google', { scope: ['email', 'profile'] })
);



app.get('/auth/fail', (req, res) => {
    res.send('Authentication failed.');
});

app.get("/protected", isLoggedIn, (req, res) => {
    // res.send(`Hello, ${req.user.displayName}`);
    res.send(req.user);
});

app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.send('Goodbye');
    });
});

// Initialize MongoDB connection
main();
