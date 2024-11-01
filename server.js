const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const flash = require('connect-flash')
const setTitle = require('node-bash-title');

const config = require('./config.json');
const session = require('express-session');
const User = require('./models/user');
const { error } = require('console');
let usersShow

require('dotenv').config();

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(flash())
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/cryptocoin')

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
}))

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// app.post('/mess', (req, res) => {
//     let clinetBodyMessage = req.body.message
//     let clinetQueryMessage = req.query.message

//     console.log(clinetBodyMessage);
//     console.log(clinetQueryMessage);
// });

app.get('/register-login', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "account.html"));
});

app.get('/users', async (req, res) => {
    usersShow = await User.find({})
    console.log(usersShow);
})

app.post('/create', async (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    const UUID = generateUUID();

    if (usersShow = (await User.find({ username: username })).length >= 1 || (await User.find({ email: email })).length >= 1) {
        await res.send(`<!DOCTYPE html>
<html lang="fa">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alert Box Example</title>
    <style>
        /* General Reset */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-size: 20px;
        }

        body, html {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #fff;
            /* background-color: #0a0d22; پس‌زمینه سایت */   
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }

        .alert-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7); /* پس‌زمینه تیره برای overlay */
            backdrop-filter: blur(5px); /* بلور کردن پس‌زمینه */
            display: none; /* مخفی بودن overlay به‌طور پیش‌فرض */
            align-items: center;
            justify-content: center;
        }

        .alert-box {
            background-color: #1e3a8a; /* رنگ پس‌زمینه alert box */
            border-radius: 15px;
            box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.5);
            padding: 20px;
            width: 300px;
            animation: slideIn 0.5s ease forwards; /* انیمیشن برای ورود از بالا */
        }

        .alert-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .alert-header h2 {
            color: #3b82f6;
            margin-bottom: 10px;
        }

        .alert-body {
            margin: 10px 0;
        }

        .alert-body p {
            color: #d1d5db;
            font-size: 1em;
            line-height: 1.5;
        }

        .alert-footer {
            display: flex;
            justify-content: flex-end;
            gap: 10px;
        }

        .confirm-btn {
            background-color: #3b82f6; /* رنگ دکمه تایید */
            color: #fff;
            padding: 10px 15px;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        .confirm-btn:hover {
            background-color: #9333ea; /* رنگ دکمه هنگام هاور */
        }

        /* Animation */
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(-100%); /* حرکت از بالای صفحه */
            }
            to {
                opacity: 1;
                transform: translateY(0); /* قرار گرفتن در وسط */
            }
        }
    </style>
</head>
<body>
    <div class="alert-overlay" id="alert-overlay">
        <div class="alert-box" id="alert-box">
            <div class="alert-header">
                <h2>Email Or Username is Already Use</h2>
            </div>
            <div class="alert-body">
            </div>
            <div class="alert-footer">
                <button class="confirm-btn" id="confirm-btn">OK</button>
            </div>
        </div>
    </div>

    <script>
        const alertOverlay = document.getElementById('alert-overlay');
        const confirmButton = document.getElementById('confirm-btn');

        // نمایش alert box هنگام بارگذاری صفحه
        window.onload = function() {
            alertOverlay.style.display = 'flex'; // نمایش alert box
        };

        confirmButton.addEventListener('click', () => {
            alertOverlay.style.display = 'none'; // پنهان کردن alert box
            window.location.href = "/register-login";
        });
    </script>
</body>
</html>
`)
    } else {
        usersShow = await User.find()

        let addUsers = new User({
            id: usersShow.length + 1,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            UUID: UUID
        })

        await addUsers.save()
        await res.redirect('/register-login')

        console.log("api worked successfully\n" + username + "\n" + email + "\n" + password + "\nUsers Number : " + (usersShow.length + 1) + "\n----------------");
    }

    // if(usersShow.length == 1){
    //     console.log(true)
    //     console.log(usersShow);
    // }else{
    //     console.log(usersShow);
    //     console.log(false);
    // }

    // // const usersNumber = Users.find()

})

app.post('/login' , async(req , res) => {
    const email = req.body.email;
    const password = req.body.password

    usersShow = await User.find({})

    let filterUsers = usersShow.filter(users => users.email == email)

    // if(usersShow = (await User.find({ email: email })) == true || (await User.find({ password: password })) == true){
    //     console.log("acount find");
    //     await res.redirect('/register-login')
    // }else{
    //     console.log("account not find");
    //     await res.redirect('/register-login')
    // }

    console.log("Login Requst Send From Client\n" + `Email : ${email}\nPassword : ${password}`);
    console.log(filterUsers[0] + "\n" + filterUsers[0].email);
    // console.log();
    
})

app.listen(config.port, () => {
    console.log(`server run on ${config.port} port\n-----------------------\nLogs :`);
    setTitle('🍻  Server');
})