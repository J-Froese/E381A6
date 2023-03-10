import { React, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Note from "./components/Note.js"
import CreateNote from "./components/CreateNote.js"

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("Notes")));
  const [inputText, setInputText] = useState("");
  const [title, setTitle] = useState("");
  
  const textHandler = (e) => {
    setInputText(e.target.value);
  };
  
  const titleHandler = (e) => {
	setTitle(e.target.value);
  };

  const saveHandler = () => {
    setNotes((prevState) => [
      ...prevState,
      {
        id: uuid(),
        nText: inputText,
		tText: title,
      },
    ]);
  };

  const deleteNote = (id) => {
    const filteredNotes = notes.filter((note) => note.id !== id);
    setNotes(filteredNotes);
  };

  const openNote = (tText, nText) => {
	setTitle(tText);
	setInputText(nText);
  };

  useEffect(() => {
	  console.log("2");
    localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  const useToggle = (initialState) => {
    const [toggleValue, setToggleValue] = useState(true);

    const toggler = () => { setToggleValue(!toggleValue) };
    return [toggleValue, toggler]
  };
  
  const [toggle, setToggle] = useToggle();

  return (
	<>
	  <section className="bar">
	    <div><h1>Lotion</h1></div>
  	    <button className="bar" id="menu" onClick={setToggle}>{'\u2630'}</button>
	  </section>
	  <section id="page">
	    {toggle && (
		<div>
	      <section className="bar">
		    <div><h1>Notes</h1></div>
		    <button onClick={() => openNote("","")}>+</button>
		  </section>
		  <section className="list">
		    {notes.map((note) => (
			  <Note
			    openNote={openNote}
				key={note.id}
				id={note.id}
				tText={note.tText}
				nText={note.nText}
				deleteNote={deleteNote}
			  />
			))}
		  </section>
	    </div>
		)}
	    <div>
		  <CreateNote
		  textHandler={textHandler}
		  titleHandler={titleHandler}
		  saveHandler={saveHandler}
		  inputText={inputText}
		  title={title}/>
		</div>
	  </section>
	</>
  );
}
export default App;