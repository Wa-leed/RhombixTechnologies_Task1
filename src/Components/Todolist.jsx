// import React, { useState } from "react";

// export default function Todolist() {
//   const [todos, setTodos] = useState([]);
//   function handleSubmit(e) {
//     e.preventDefault();
//     const todo = e.target.todo.value;
//     setTodos([...todos, todo]);
//     e.target.todo.value = "";
//   }

//   return (
//     <div>
//       <h1>Todo List</h1>
//       <form onSubmit={(e) => handleSubmit(e)}>
//         <input type="text" name="todo" />
//         <button>Add Todo</button>
//       </form>
//       {/* <ul> */}
//       {todos.map((item, idx) => (
//         <div key={idx} style={{ display: "flex" }}>
//           <li>{item}</li>
//           <button>Delete</button>
//         </div>
//       ))}
//       {/* </ul> */}
//     </div>
//   );
// }

import { useReducer } from "react";

function TodoReducer(state, action) {
  switch (action.type) {
    case "submit":
      action.payload.preventDefault();
      const data = action.payload.target.todo.value;
      action.payload.target.todo.value = "";
      return { todo: [...state.todo, data] };

    case "delete":
      const updatedtodos = [...state.todo];
      updatedtodos.splice(action.payload, 1);
      return { todo: updatedtodos };

    default:
      return console.log("eror");
  }
}

export default function Todolist() {
  const [state, dispatch] = useReducer(TodoReducer, { todo: [] });

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={(e) => dispatch({ type: "submit", payload: e })}>
        <input type="text" name="todo" />
        <button>Add Todo</button>
      </form>
      {/* <ul> */}
      {state.todo.map((item, idx) => (
        <div key={idx} style={{ display: "flex" }}>
          <li>{item}</li>
          <button onClick={() => dispatch({ type: "delete", payload: idx })}>
            Delete
          </button>
        </div>
      ))}
      {/* </ul> */}
    </div>
  );
}
