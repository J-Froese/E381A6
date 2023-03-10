import { React, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Note from "./components/Note.js"
import CreateNote from "./components/CreateNote.js"

function App() {
  const [notes, setNotes] = useState([]);
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
  	localStorage.setItem("Notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Notes"));
	if (data) {
      setNotes(data);
	}
  }, []);

  const useToggle = (initialState) => {
    const [toggleValue, setToggleValue] = useState(true);

    const toggler = () => { setToggleValue(!toggleValue) };
    return [toggleValue, toggler]
  };
  
  const [toggle, setToggle] = useToggle();

  return (
	<>
	  <section class="bar">
	    <div><h1>Lotion</h1></div>
  	    <button class="bar" id="menu" onClick={setToggle}>{'\u2630'}</button>
	  </section>
	  <section id="page">
	    {toggle && (
		<div>
	      <section class="bar">
		    <div><h1>Notes</h1></div>
		    <button onClick={() => openNote("","")}>+</button>
		  </section>
		  <section class="list">
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