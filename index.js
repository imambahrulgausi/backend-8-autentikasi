const express = require('express');
const app = express();
const port = 5000;
const session = require('express-session')

app.use(session({
    scret: 'scret-key',
    resave: false,
    saveUninitialized: false
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const mongoose = require('mongoose')
require('dotenv').config();
mongoose.connect(process.env.DATABASE_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function(){
    console.log("Sukses Terkoneksi dengan mongodb");
});

app.get('/', (req,res) => {
    res.send('Hello Express!')
})

//params pertama hanya nim
app.get('/mahasiswa/:nim', (req, res) => {
    const nim = req.params.nim;
    res.send(`NIM: ${nim}`);
});

//params kedua ditambah semester
app.get('/mahasiswa/:nim/:semester', (req, res) => {
    const nim = req.params.nim;
    const semester = req.params.semester;
    res.send(`NIM: ${nim} SEMESTER: ${semester}`);
});

//query pertama hanya nim dan query kedua ditambah semester
app.get('/mahasiswa', (req, res) => {
    const nim = req.query.nim;
    const semester = req.query.semester;
    res.send(`NIM: ${nim} SEMESTER: ${semester}`);
});

// body
app.use(express.json());

app.post('/mahasiswa', (req, res) => {
    const nim = req.body.nim;
    const nama = req.body.nama;
    const angkatan = req.body.angkatan;
    const prodi = req.body.prodi;

    //proses penyimpanan data mahasiswa
    res.send(`Data mahasiswa dengan NIM ${nim} berhasil disimpan`)
});

app.get('/mahasiswa', (req,res) => {
    res.send('get data mahasiswa')
})

app.post('/', (req,res) => {
    res.send(`Post Data`)
})

app.put('/', (req,res) => {
    res.send(`Update data sukses`)
})

app.delete('/', (req,res) => {
    res.send(`Hapus data berhasil`)
})

app.listen(port, () => {
    console.log(`server berjalan pada localhost:${port}`)
});