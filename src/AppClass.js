import React from "react";
import "./App.css";

import Note from "./Note/Note";
import NoteForm from "./NoteForm/NoteForm";

import firebase from "firebase/app";
import { DB_CONFIG } from "./config/config";
import "firebase/database";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: [
				//	{noteId: 1, noteContent: 'Note 1'},
				//	{noteId: 2, noteContent: 'Note 2'}
			],
			noteIdSelected: 0,
			noteContentSelected: "",
		};
		this.addNote = this.addNote.bind(this);
		this.removeNote = this.removeNote.bind(this);
		this.clickNote = this.clickNote.bind(this);
		this.updateNote = this.updateNote.bind(this);

		// db connection
		this.app = firebase.initializeApp(DB_CONFIG);
		this.db = this.app.database().ref().child("notes");
	}

	componentDidMount() {
		let { notes } = this.state;
		this.db.on("child_added", snap => {
			notes.push({
				noteId: snap.key,
				noteContent: snap.val().noteContent,
			});

			this.setState({ ...this.state, notes });
		});

		this.db.on("child_removed", snap => {
			for (let i = 0; i < notes.length; i++) {
				if (notes[i].noteId === snap.key) {
					notes.splice(i, 1);
				}
			}
			this.setState({ ...this.state, notes });
		});

		this.db.on("child_changed", snap => {
			notes.find(x => x.noteId === snap.key)[
				"noteContent"
			] = snap.val().noteContent;

			this.setState({ ...this.state, notes });
		});
	}

	clickNote(noteId) {
		let noteToEdit = this.state.notes.find(item => item.noteId === noteId);

		this.setState({
			...this.state,
			noteIdSelected: noteToEdit.noteId,
			noteContentSelected: noteToEdit.noteContent,
		});
	}

	addNote(note) {
		this.db.push().set({ noteContent: note });
	}

	removeNote(noteId) {
		this.db.child(noteId).remove();
	}

	updateNote(noteContent) {
		if (this.state.noteIdSelected === 0) {
			// Nueva
			this.addNote(noteContent);
		} else {
			// Modificacion
			this.db.child(this.state.noteIdSelected).update({
				noteContent: noteContent,
			});
		}
	}

	render() {
		return (
			<div className="notesContainer">
				<div className="notesHeader">
					<h1>React and Firebase Notes App {this.props.nombre}</h1>
				</div>

				<div className="notesBody">
					{this.state.notes.map(note => {
						return (
							<Note
								noteContent={note.noteContent}
								noteId={note.noteId}
								key={note.noteId}
								removeNote={this.removeNote}
								clickNote={this.clickNote}
							/>
						);
					})}
				</div>

				<div className="notesFooter">
					<NoteForm
						addNote={this.updateNote}
						noteId={this.state.noteIdSelected}
						noteText={this.state.noteContentSelected}
					/>
				</div>
			</div>
		);
	}
}

//export default App;
