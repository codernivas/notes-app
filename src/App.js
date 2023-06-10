import React, { useState, useEffect } from "react";
import axios from "axios";
const App = () => {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    fetch("http://localhost:3001/notes")
      .then(response => {
        return response.json();
      })
      .then(data => {
        setNotes(data);
      });
  };
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddNote = async () => {
    if (inputValue.trim() !== "") {
      try {
        const response = await axios.post("http://localhost:3001/notes", {
          text: inputValue,
        });
        setNotes([...notes, response.data]);
        setInputValue("");
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/notes/${id}`);
      const updateNotes = notes.filter((note) => note.id !== id);
      setNotes(updateNotes);
    } catch (error) {
      console.error("Error delete notes:", error);
    }
  };

  return (
    <div>
      <h1>Notes app</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleAddNote}>Add</button>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.text}
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
