import { useReducer } from "react";


// Reducer function to handle actions
function TodoReducer(state, action) {
  switch (action.type) {
    case "submit":
      action.payload.preventDefault();

      // Fetch title and para values
      const title = action.payload.target.tittle.value;
      const para = action.payload.target.para.value;

      // Skip adding if title or para is empty
      if (!title || !para) return state;

      // Clear input fields
      action.payload.target.tittle.value = "";
      action.payload.target.para.value = "";

      // Return updated notes array
      return { notes: [...state.notes, { title, para }] };

    case "delete":
      const updatedNotes = state.notes.filter(
        (_, index) => index !== action.payload
      );
      return { notes: updatedNotes };

    default:
      console.log("Error: Unknown action type");
      return state;
  }
}

export default function StickyNotes() {
  const [state, dispatch] = useReducer(TodoReducer, { notes: [] });

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 to-blue-600 flex flex-col items-center p-6">
      <h1 className="text-4xl font-extrabold text-white animate-bounce mb-8">
        Sticky Notes
      </h1>

      {/* Form for submitting notes */}
      <form
        onSubmit={(e) => dispatch({ type: "submit", payload: e })}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg space-y-4"
      >
        <input
          type="text"
          placeholder="Enter Title"
          name="tittle"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="para"
          placeholder="Enter Paragraph"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Add Note
        </button>
      </form>

      {/* Displaying Notes */}
      <div className="w-full max-w-md mt-8 space-y-4">
        {state.notes.length === 0 ? (
          <p className="text-white text-center">No notes yet.</p>
        ) : (
          state.notes.map((note, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-4 bg-yellow-100 border-l-4 border-yellow-500 shadow-lg rounded-lg transform hover:scale-105 transition duration-300"
            >
              <div>
                <strong className="text-gray-800">{note.title}:</strong>{" "}
                <p className="text-gray-600">{note.para}</p>
              </div>
              <button
                onClick={() => dispatch({ type: "delete", payload: idx })}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
