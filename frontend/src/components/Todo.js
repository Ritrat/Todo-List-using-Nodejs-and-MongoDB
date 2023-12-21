import axios from "axios"; 
import React from "react"; 
import { useEffect, useState } from "react"; 

function Todo() { 
	const [todoList, setTodoList] = useState([]); 
	const [editableId, setEditableId] = useState(null); 
	const [editedTask, setEditedTask] = useState(""); 
	const [newTask, setNewTask] = useState(""); 

	useEffect(() => { 
		axios.get('http://127.0.0.1:3001/getTodoList') 
			.then(result => { 
				setTodoList(result.data) 
			}) 
			.catch(err => console.log(err)) 
	}, []) 

	const toggleEditable = (id) => { 
		const rowData = todoList.find((data) => data._id === id); 
		if (rowData) { 
			setEditableId(id); 
			setEditedTask(rowData.task); 
		} else { 
			setEditableId(null); 
			setEditedTask(""); 
		} 
	}; 

	const addTask = (e) => { 
		e.preventDefault(); 
		if (!newTask) { 
			alert("All fields must be filled out."); 
			return; 
		} 

		axios.post('http://127.0.0.1:3001/addTodoList', { task: newTask}) 
			.then(res => { 
				console.log(res); 
				axios.get('http://127.0.0.1:3001/getTodoList')
				.then(res =>{
					console.log(res);
					setTodoList(res.data)
				})
			}) 
			.catch(err => console.log(err)); 
	} 

	const saveEditedTask = (id) => { 
		const editedData = { 
			task: editedTask, 
		}; 

		if (!editedTask) { 
			alert("Not Filled"); 
			return; 
		} 

		axios.post('http://127.0.0.1:3001/updateTodoList/' + id, editedData) 
			.then(result => { 
				console.log(result); 
				setEditableId(null); 
				setEditedTask(""); 
				axios.get('http://127.0.0.1:3001/getTodoList')
				.then(res =>{
					console.log(res);
					setTodoList(res.data)
				}) 
			}) 
			.catch(err => console.log(err)); 
	} 

	const deleteTask = (id) => { 
		axios.delete('http://127.0.0.1:3001/deleteTodoList/' + id) 
			.then(result => { 
				console.log(result); 
				axios.get('http://127.0.0.1:3001/getTodoList')
				.then(res =>{
					console.log(res);
					setTodoList(res.data)
				}) 
			}) 
			.catch(err => 
				console.log(err) 
			) 
	} 

	return ( 
		    <div class="flex-container">
	 
					<div> 
					<h2>Todo List</h2> 
						<table> 
							<thead> 
								<tr> 
									<th>Task</th> 
									<th>Actions</th> 
								</tr> 
							</thead> 
							{Array.isArray(todoList) ? ( 
								<tbody> 
									{todoList.map((data) => ( 
										<tr key={data._id}> 
											<td> 
												{editableId === data._id ? ( 
													<input 
														type="text"
														value={editedTask} 
														onChange={(e) => setEditedTask(e.target.value)} 
													/> 
												) : ( 
													data.task 
												)} 
											</td> 
										

											<td> 
												{editableId === data._id ? ( 
													<button className="editbutton" onClick={() => saveEditedTask(data._id)}> 
														Save 
													</button> 
												) : ( 
													<button className="editbutton" onClick={() => toggleEditable(data._id)}> 
														Edit 
													</button> 
												)} 
												<button className="delbutton" onClick={() => deleteTask(data._id)}> 
													Delete 
												</button> 
											</td> 
										</tr> 
									))} 
								</tbody> 
							) : ( 
								<tbody> 
									<tr> 
										<td colSpan="4">Loading products...</td> 
									</tr> 
								</tbody> 
							)} 


						</table> 
					</div> 
				 
				<div> 
					<h2>Add Task</h2> 
					<form> 
						 
				
							<input 
								type="text"
								placeholder="Enter Task"
								onChange={(e) => setNewTask(e.target.value)} 
							/> 
						
						<button className="addbutton" onClick={addTask}> 
							Add Task 
						</button> 
					</form> 
				</div>

			</div> 
	) 
} 
export default Todo;
