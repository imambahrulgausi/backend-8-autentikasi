const express = require('express');
const app = express();
const session = require('express-session');
const port = 4000;


app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false
}));

const authenticate = (req, res, next) => {
    if (req?.session.isAuthenticated) {
        next();
    } else {
        res.status(401).send('Tidak Terautentikasi'); 
    }
};

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username == 'admin' && password == 'password') {
        req.session.isAuthenticated = true;
        res.send('Login Sukses');
    } else {
        res.status(401).send('Kredensial Tidak Valid');
    }
});

app.get('/logout', (req,res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else {
            res.send('Logout')
        }
    });
});

app.post('/protected', authenticate, (req, res) => {
    res.send(' route terproteksi (POST)')
});

app.get('/protected', authenticate, (req, res) => {
    res.send('Anda masuk pada route terproteksi (GET)')
});

app.put('/protected', authenticate, (req, res) => {
    res.send(' route terproteksi (PUT)')
});

app.delete('/protected', authenticate, (req, res) => {
    res.send(' route terproteksi (DELETE)')
});


app.listen(port, () => {
    console.log(`server berjalan pada localhost:${port}`)
});