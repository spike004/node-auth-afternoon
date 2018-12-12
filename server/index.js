require('dotenv').config();
const express = require('express');
const session = require('express-session');
// const bcrypt = require('bcryptjs');
const massive = require('massive')
const app = express();
const authCtrl = require('./controllers/authController');
const treasureCtrl=require('./controllers/treasureController')
const auth=require('./middleware/authMiddleware')
app.use(express.json())
app.listen();

let { SERVER_PORT, CONNECTION_STRING, SECRET } = process.env;

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))


massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
})

app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);
app.get('/api/treasure/dragon', treasureCtrl.dragonTreasure)
app.get('/api/treasure/user', auth.usersOnly, treasureCtrl.getUserTreasure)
app.post('/api/treasure/user', auth.usersOnly, treasureCtrl.addUserTreasure)
app.get('/api/treasure/all', auth.usersOnly, treasureCtrl.getAllTreasure);
app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`)
})  