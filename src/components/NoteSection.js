import React, { useState } from "react";
import "./Style.css";
import { IoIosAdd } from "react-icons/io";

function NoteSection({ onAdd }) {
  const [note, setNote] = useState({
    content: "",
  });

  function handleChange(e) {
    const value = e.target.value;
    setNote(value);
  }

  function submitButton(event) {
    onAdd(note);
    console.log("feffwfffffffff:--", note);
    setNote({
      content: "",
    });
    event.preventDefault();
  }
  return (
    <div>
      <form action="" className="form">
        <button className="note__button" onClick={submitButton}>
          <IoIosAdd size={35} />
        </button>
        <textarea
          claasName="form-textarea"
          type="text"
          placeholder="Take a note ....."
          name="content"
          onChange={handleChange}
        />
      </form>
    </div>
  );
}

export default NoteSection;
