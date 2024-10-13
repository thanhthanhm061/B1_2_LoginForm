const express = require('express');
const bodyParser = require ('body-parser');
const fs = require('fs')
const app = express();
const port = 3002;

app.use(bodyParser.urlencoded({ extended: true}));

app.set('view engine', 'ejs');

app.get('/login', (req, res) =>{
    res.render('login')

});
app.use(express.static('/images'));

app.post('/login', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;

//user.txt
fs.readFile('user.txt', 'utf8', (err ,data) => {
    if (err) {
        console.error(err);
        res.send('Error reading user data');
        return;
    }
    const [storedUsername, storedPasswork ] = data.trim().split(',');
    if (username === storedUsername && password === storedPasswork ) {
        res.send(`Login successful! Welcome , ${username}`);
    } else {
        res.send('Login failed. Invalid username or password .');
    }
});
});
//Khoi tao server
app.listen(port, ()=>{
    console.log(`Server is runnig on http://localhost:${port}`);
})
