import {RequestHandler} from 'express';
import { Todo } from '../model/todo';
import { json } from "body-parser";

const TODOS: Todo[]=[];

export const createTodo: RequestHandler = (req, res, next) => {
    // console.log(req);
    const text = (req.body as {text: string}).text;
    console.log("---Text-->",text);
    const newTodo = new Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    console.log("---Text-->",newTodo);
    res.status(201).json({message: 'Created the todo', createTodo: newTodo});

}

export const getTodo: RequestHandler = (req, res, next) => {
    res.status(201).json({todo: TODOS});
}

export const updateTodo: RequestHandler<{id: string}> = (req, res, next)=>{
    const todoId = req.params.id;
    const updatedText = (req.body as {text: string}).text;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if(todoIndex < 0){
        throw new Error('Could not find the todo');
    }
    TODOS[todoIndex].text = updatedText;
    res.status(201).json({message: 'Updated',todo: TODOS[todoIndex]});

}

export const deleteTodo: RequestHandler<{id: string}> = (req, res, next)=>{
    const todoId = req.params.id;
    const todoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if(todoIndex < 0){
        throw new Error('Could not find the todo');
    }
    TODOS.splice(todoIndex);
    res.status(201).json({message: 'Deleted',Id: todoId});
}