import React, { Component } from 'react';
import './NoteForm.css';

class NoteForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			noteText: props.noteText
		};

		console.log("Constructor = ", this.props)

		this.handleUserInput = this.handleUserInput.bind(this);
		this.addNote = this.addNote.bind(this);
	}

	handleUserInput(e) {
		this.setState({
			noteText: e.target.value
		})
	}

	addNote() {
		this.props.addNote(this.state.noteText);
		this.setState({
			noteText: ''
		});
		this.textInput.focus();
	}

	updateNote() {
		this.props.updateNote(this.state.noteText);
		this.setState({
			noteText: ''
		});
		this.textInput.focus();
	}

	componentDidMount() {
		this.textInput.focus();
	}

	render() {
		return (
			<div className="NoteForm">
				<input
					type="text"
					ref={input => { this.idInput = input;}}
					value={this.props.noteId}
					/>
				<input
					placeholder="Escriba una nota"
					className="noteInput"
					ref={input => { this.textInput = input;}}
					value={this.state.noteText}
					onChange={this.handleUserInput}
					type="text"/>

				<button
					onClick={this.addNote}
					className="noteButton">
					Añadir/modificar
				</button>
			</div>
		)
	}
}

export default NoteForm;
