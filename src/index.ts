import express from "express"
import { Request,Response } from "express"
import { todos } from "./db"
import cors from "cors"
const app = express()
app.use(express.json())
app.use(cors({
origin:"*"
}))
app.post("/",(req,res)=>{
    const {title,description} = req.body;
    const id = crypto.randomUUID()
    todos[id] = {title,description}
    res.status(201).send(todos[id])
})
app.get("/todos",(req:Request,res:Response)=>{
    res.status(200).send(todos)
})
app.delete("/:todoId",(req:Request,res:Response)=>{
    const id = req.params.todoId;
    delete todos[id]
    res.status(200).send(todos)
})
app.put("/:todoId",(req,res)=>{
    const {title} = req.body
    const todo = todos[req.params.todoId]
    todos[req.params.todoId] = {title,description:todo.description}
    res.send(todos).status(200)
})
app.listen(8005,()=>{
    console.log("Server running at Port 8005")
})