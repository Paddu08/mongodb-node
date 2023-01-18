const express = require('express');
const app = express();
const mongoose=require('mongoose');
const cors = require('cors');
app.use(cors());
const multer  = require('multer');
const upload = multer();
mongoose.connect('mongodb+srv://admin:12345@cluster0.gpoqn.mongodb.net/hello', {useNewUrlParser: true, useUnifiedTopology: true});

const TodoSchema=new mongoose.Schema({
    task:String,
    time:String,
    date:String
});
const Todo=mongoose.model('todo',TodoSchema)
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/todos',upload.any(), (req, res) => {

    const data=req.body;
    console.log(data);
    const todo=new Todo(data);
    console.log(req.body); 
    todo.save((error) => {
        if (error) {
            res.status(500).json({ error });
        } else {
            res.json({ message: 'Form data saved to MongoDB' });
        }
    });
});
app.get('/todos', async (req, res) => {
    const todos = await Todo.find()
    res.json(todos)
    console.log(req.body);
})

    

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
