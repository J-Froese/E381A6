import { React } from "react";

function CreateNote({ textHandler, titleHandler, saveHandler, inputText, title}) {
  
  
  return (
    <div className="note">
      <div className="noteHeader">
        <textarea
          cols="40"
          rows="1"
		  value={title}
          placeholder="Title...."
          onChange={titleHandler}
        ></textarea>
        <button className="noteSave" onClick={saveHandler}>Save</button>
      </div>
      <textarea
        cols="50"
        rows="5"
		value={inputText}
        placeholder="Type...."
        onChange={textHandler}
      ></textarea>
    </div>
  );
}

export default CreateNote;