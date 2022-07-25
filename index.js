// / adalah halaman Login
// Nodejs Third party module
// Express
const mysql = require('mysql');
const express = require('express')
const app = express()
const PORT = 9000;
// Bodyparser
const body_parser = require('body-parser');
const encoder = body_parser.urlencoded()


// view engine
const expressLayouts = require('express-ejs-layouts')
app.set('view-engine', 'ejs')
app.use(expressLayouts)

// Direkomendasikan untuk menyimpan key value pada dotenv file.
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port:"3306",
    database: "sql_login_test"
});

// Connect to database
db.connect((err) => {
    if(err) throw err
    console.log('Successfully connected to database')
});

app.get('/', (req, res) => {
    res.render('login.ejs', {
        layout: 'layouts/main-layout.ejs',
        page: 'login'
    });
});

// === Login system ===
let check_login = (username, password, res) => {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users WHERE user_name = "${username}" AND user_pass = ${password} `, (err, result) => {
            if(err){
                reject(err)
                res.redirect('/')
            }
            else {
                resolve(result)
                res.redirect('/welcome')
            }
            res.end()
        });
    });
}

app.post('/', encoder, async (req, res) => {
    let username = req.body.user_name;
    let password = req.body.user_pass;
    const result = await check_login(username, password, res)
    console.log(result)
    // console.log(check_login(username, password))
});

// When login is success
app.get('/welcome', (req, res) => {
    res.render('welcome.ejs', {
        layout: 'layouts/main-layout.ejs',
        page: 'welcome'
    });
});

app.listen(PORT, () => {
    console.log(`App is listening to port:${PORT}`)
});