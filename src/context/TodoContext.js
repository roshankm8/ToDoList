import { createContext, useContext } from "react";
export const ToDoContext = createContext({
    todoTotal:[
        {
            id:1,
            todoMsg : "Learn React",
            isCompleted : false
        }
    ],
    addToDo : (todoMsg) => {
        console.log("todoMsg",todoMsg);
    },
    removeTodo : (id) => {
        console.log("id",id);
    },
    updateTodo: (_todoMsg,id) =>{

    },
    completedToDo : (id) => {

    }
})
export const useToDo = () => {
    return useContext(ToDoContext) //jb v usecontext use krenge to jo creaTE KIYE H CONTEXT WO DENA PREGA
}
export const ToDoProvider = ToDoContext.Provider // ye provider h jo value pass krega