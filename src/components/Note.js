import React from "react";
import { MdDelete } from "react-icons/md";
import "./Style.css";

function Note({ content, onDelete, id }) {
  return (
    <div className="note">
      <button className="delete__button" onClick={() => onDelete(id)}>
        <MdDelete size={25} />
      </button>
      <p>{content}</p>
    </div>
  );
}

export default Note;
