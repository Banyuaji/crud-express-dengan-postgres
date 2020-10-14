const express = require("express")
const app = express()
const pool = require('./db')

app.use(express.json())

app.post('/siswa', async(req, res) =>{
    try {
        const {nisn} = req.body;
        const {nama} = req.body;
        const {jkl} = req.body;
        const {alamat} = req.body;
        const {kelas} = req.body;
        const {jurusan} = req.body;
        const nMurid = await pool.query(
            "INSERT INTO murid (nisn, nama, jkl, alamat, kelas, jurusan) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
            [nisn, nama, jkl, alamat, kelas, jurusan]
        );

        res.json(nMurid.rows)
    } catch (err) {
        console.log(err)
    }
})

app.get('/siswa', async(req, res) =>{
    try {
        const gMurid = await pool.query(
            "SELECT * FROM murid"
        );

        res.json(gMurid.rows)
    } catch (err) {
        console.log(err.message)
    }
})

app.get('/siswa/:id', async(req, res) =>{
    const {id} = req.params
    try {
        const gMurid = await pool.query(
            "SELECT * FROM murid WHERE id = $1",
            [id]
        );

        res.json(gMurid.rows)
    } catch (err) {
        console.log(err.message)
    }
})

app.put('/siswa/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const {nisn} = req.body;
        const {nama} = req.body;
        const {jkl} = req.body;
        const {alamat} = req.body;
        const {kelas} = req.body;
        const {jurusan} = req.body;
        const updateTodo = await pool.query(
            "UPDATE murid SET nisn = $1, nama = $2, jkl = $3, alamat = $4, kelas = $5, jurusan = $6 WHERE id = $7",
            [nisn, nama, jkl, alamat, kelas, jurusan, id]
        );

        res.json("Todo Updated")
    } catch (err) {
        console.log(err.message)
    }
})

//delete a todo
app.delete('siswa/:id', async(req, res)=> {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query(
            "DELETE FROM todo WHERE todo_id = $1",
            [id]
        );
        res.json("Todo Deleted")
    } catch (err) {
        
    }
})

app.listen(8080, () => {
    console.log('listening')
})