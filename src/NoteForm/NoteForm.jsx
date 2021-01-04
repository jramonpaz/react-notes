import React, {useState, useEffect} from 'react'
import './NoteForm.css';


const NoteForm = ({noteId, textoDeLaNota, addNewNoteFunction}) => {
	const [noteText, setNoteText] = useState(textoDeLaNota)

	useEffect(() => {
		setNoteText(textoDeLaNota)
	}, [textoDeLaNota]);

	const handleUserInput = e => {
		setNoteText(e.target.value);
	}

	// @ts-ignore
	const addNote = () => {
		addNewNoteFunction(noteText);
		setNoteText('');
	}

	return (
		<div className="NoteForm">
				<input
					type="hidden"
					value={noteId}
					/>
				<input
					placeholder="Escriba una nota"
					className="noteInput"
					value={noteText}
					onChange={handleUserInput}
					type="text"/>

				<button
					// @ts-ignore
					onClick={addNote}
					className="noteButton">
					Añadir/Modificar
				</button>
			</div>
	)
}

export default NoteForm
