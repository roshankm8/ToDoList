import React from "react";
import { useState } from "react";
import { useToDo } from "../context/TodoContext"; // ye context se import kiya h jo value pass karega
function TodoItem({todo}) {
    console.log("todo",todo);
    
    const [isToDoEditable, setIsToDoEditable] = useState(false);
    const [updateTodoMsg, setUpdateTodoMsg] = useState(todo.todoMsg);
    const {updateTodo,removeTodo,completedToDo} = useToDo()
    const editToDo = () => {
        updateTodo(todo.id,{...todo, todo:updateTodoMsg}) // ye pura object h jo todo ki id or todoMsg ko update karega
        setIsToDoEditable(false) // ye isliye kiya h kyuki jab edit ho jayega to fir se editable nahi hona chahiye
    }
    const isChecked = () => {
            
        completedToDo(todo.id);         
        console.log("Todo completed status changed for id:", todo.id); 
        
    }
  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.isCompleted ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.isCompleted}
        onChange={isChecked}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isToDoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.isCompleted ? "line-through" : ""}`}
        value={updateTodoMsg}
        onChange={(e) => setUpdateTodoMsg(e.target.value)}
        readOnly={!isToDoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
        //   if (todo.isCompleted) return;

        //   if (isToDoEditable) {
        //     editToDo();
        //   } else setIsToDoEditable((prev) => !prev);
        if (!todo.isCompleted) {
            if (isToDoEditable) {
              editToDo();
            } else {
              setIsToDoEditable(function(prev) {
                return !prev;
              });
            }
          }
        }}
        disabled={todo.isCompleted}
      >
        {isToDoEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => removeTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
