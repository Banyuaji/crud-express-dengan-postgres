const express = require("express")
const app = express()
const pool = require('./db')

app.use(express.json())

//ROUTES

//get all todos
app.get('/todos', async(req, res) =>{
    try {
        const getTodo = await pool.query(
            "SELECT * FROM todo"
        );

        res.json(getTodo.rows)
    } catch (err) {
        console.log(err.message)
    }
})

//get a todo
app.get('/todos/:id', async(req, res) =>{
    const {id} = req.params
    try {
        const getTodo = await pool.query(
            "SELECT * FROM todo WHERE todo_id = $1",
            [id]
        );

        res.json(getTodo.rows)
    } catch (err) {
        console.log(err.message)
    }
})

//create a todo
app.post('/todos', async(req, res) =>{
    try {
        const {description} = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES ($1) RETURNING *",
            [description]
        );

        res.json(newTodo.rows)
        console.log(req.body)
    } catch (err) {
        console.log(err.message)
    }
})

//update a todo
app.put('/todos/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const {description} = req.body
        const updateTodo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2",
            [description, id]
        );

        res.json("Todo Updated")
    } catch (err) {
        console.log(err.message)
    }
})

//delete a todo
app.delete('todos/:id', async(req, res)=> {
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

app.listen(5000, () => {
    console.log('listening')
})