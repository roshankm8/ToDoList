import { useState , useEffect} from "react";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";
import "./App.css";
import { ToDoProvider } from "./context/TodoContext";

function App() {
  const [todoTotal, settodoTotal] = useState([]);
  const addToDo = (todoMsg) => {
    settodoTotal((prev) => [ //prev purana array h jo initially h or usme jo naya rray add hoga wo sabse pehle aayega
      { id: Date.now(), ...todoMsg }, 
      ...prev,
    ])
    console.log("todoMsg", todoMsg);
    
  }
  const updateTodo = ( id,todoMsg) => {
    settodoTotal((prev) => prev.map((eachvalue) => (eachvalue.id === id ? todoMsg :eachvalue)
      
    ))
  }

  const removeTodo = (id) => {
    settodoTotal((prev) => prev.filter((eachValue) => eachValue.id !== id)) // iska mtlb h jo id match ho jayega wo dlt ho jayega or jo nahi hoga wo reh jayega
    console.log("id", id);
  }
  const completedToDo = (id) => {
    settodoTotal((prev) =>
      prev.map((eachValue) =>
        eachValue.id === id
          ? { ...eachValue, isCompleted: !eachValue.isCompleted } //yaha pe hmlog eachvalue ko spread kiye h or usme isCompleted ki value ko toggle kiye h
          : eachValue
      )
    );
  };
  // ye map karke pura array ko return krega or jo id match hoga uska isCompleted true ho jayega or baaki sab ka false

//localStorage
// localStorage - Load todos when app starts
useEffect(() => {
  const todoTotal = JSON.parse(localStorage.getItem("todoTotal")) || [] // ye localStorage se data le raha h or agar nahi h to empty array dega;
  console.log("storeditem dd", todoTotal);
  settodoTotal(todoTotal);
}, []);

// localStorage - Save todos whenever list changes
useEffect(() => {
  localStorage.setItem("todoTotal", JSON.stringify(todoTotal));
  console.log("todoTotal updated", todoTotal);
}, [todoTotal]);

 // ye jab bhi todoTotal change hoga tab localStorage m set ho jayega
// ye useEffect m hmlog localStorage se data le rahe h or agar data h to settodoTotal m set kar rahe h

  return (
    <ToDoProvider
      value={{ todoTotal, addToDo, removeTodo, updateTodo, completedToDo }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">{/* Todo form goes here */}
          <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todoTotal.map((eachvalue) => (
              <div key={eachvalue.id} className="w-full"> 
                <TodoItem todo={eachvalue} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToDoProvider>
  );
}

export default App;
