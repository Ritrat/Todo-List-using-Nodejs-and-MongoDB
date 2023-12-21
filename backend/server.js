const express = require('express') 
const mongoose = require('mongoose') 
const cors = require('cors') 
const TodoModel = require("./models/todoList") 

var app = express(); 
app.use(cors()); 
app.use(express.json()); 

mongoose.connect("mongodb://localhost:27017"); 
console.log("database connected")

mongoose.connection.on("error", (error) => { 
	console.error("MongoDB connection error:", error)});

app.get("/getTodoList", (req, res) => { 
	TodoModel.find({}) 
		.then((todoList) => res.json(todoList)) 
		.catch((err) => res.json(err)) 
}); 

app.post("/addTodoList", (req, res) => { 
	TodoModel.create({ 
		task: req.body.task, 
	}) 
		.then((todo) => res.json(todo)) 
		.catch((err) => res.json(err)); 
}); 
 
app.post("/updateTodoList/:id", (req, res) => { 
	const id = req.params.id; 
	const updateData = { 
		task: req.body.task, 
	}; 
	TodoModel.findByIdAndUpdate(id, updateData) 
		.then((todo) => res.json(todo)) 
		.catch((err) => res.json(err)); 
}); 

app.delete("/deleteTodoList/:id", (req, res) => { 
	const id = req.params.id; 
	TodoModel.findByIdAndDelete({ _id: id }) 
		.then((todo) => res.json(todo)) 
		.catch((err) => res.json(err)); 
}); 

app.listen(3001, () => { 
	console.log('Server running on 3001'); 
}); 
