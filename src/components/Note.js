import React from "react";

function Note({ id, tText, nText, deleteNote, openNote }) {
  var exText = "";
  if (nText.length > 8) {exText = "..."} 
	
  return (
    <div className="note">
	  <div className="noteHeader" onClick={() => openNote(tText, nText)}>{tText}</div>
	  <div className="noteBody" onClick={() => openNote(tText, nText)}>{nText.slice(0,8)}{exText}</div>
	  <div className="noteFooter" style={{ justifyContent: "flex-end" }}>
	    <button onClick={() => openNote(tText, nText)}>Open</button>
	    <button onClick={() => deleteNote(id)}>Del</button>
	  </div>
	</div>
  );
}

export default Note;