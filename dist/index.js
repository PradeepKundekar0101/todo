"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*"
}));
app.post("/", (req, res) => {
    const { title, description } = req.body;
    const id = crypto.randomUUID();
    db_1.todos[id] = { title, description };
    res.status(201).send(db_1.todos[id]);
});
app.get("/todos", (req, res) => {
    res.status(200).send(db_1.todos);
});
app.delete("/:todoId", (req, res) => {
    const id = req.params.todoId;
    delete db_1.todos[id];
    res.status(200).send(db_1.todos);
});
app.put("/:todoId", (req, res) => {
    const { title } = req.body;
    const todo = db_1.todos[req.params.todoId];
    db_1.todos[req.params.todoId] = { title, description: todo.description };
    res.send(db_1.todos).status(200);
});
app.listen(8005, () => {
    console.log("Server running at Port 8005");
});
