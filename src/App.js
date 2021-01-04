import React, { useState, useEffect } from "react";
import Note from "./Note/Note";
import NoteForm from "./NoteForm/NoteForm";

import "./App.css";

import serviceNotes from "./services/notes";

const App = ({ nombre }) => {
	const [selectedNoteId, setSelectedNodeId] = useState(0);
	const [selectedNoteText, setSelectedNodeText] = useState("");
	const [notes, setNotes] = useState([]);

	console.log("render");

	const onDataChange = items => {
		let newNotes = [];

		items.forEach(item => {
			let key = item.key;
			let data = item.val();

			newNotes.push({
				noteId: key,
				noteContent: data.noteContent,
			});
		});

		setNotes(newNotes);
	};

	const removeNote = key => {
		serviceNotes.remove(key);
	};

	const selectNote = (key, text) => {
		setSelectedNodeId(key);
		setSelectedNodeText(text);
	};

	const updateNote = noteContent => {
		if (selectedNoteId === 0) {
			serviceNotes.create({ noteContent });
		} else {
			serviceNotes.update(selectedNoteId, { noteContent });
		}

		setSelectedNodeId(0);
		//setSelectedNodeText("");
	};

	useEffect(() => {
		serviceNotes.getAll().on("value", onDataChange);

		return () => {
			serviceNotes.getAll().off("value", onDataChange);
		};
	}, []);

	return (
		<div className="notesContainer">
			<div className="notesHeader">
				<h1>React and Firebase Notes App {nombre}</h1>
			</div>

			<div className="notesBody">
				{notes.map(note => {
					return (
						<Note
							noteContent={note.noteContent}
							noteId={note.noteId}
							key={note.noteId}
							removeNote={removeNote}
							clickNote={selectNote}
						/>
					);
				})}
			</div>

			<div className="notesFooter">
				<NoteForm
					addNewNoteFunction={updateNote}
					noteId={selectedNoteId}
					textoDeLaNota={selectedNoteText}
				/>
			</div>
		</div>
	);
};

export default App;
