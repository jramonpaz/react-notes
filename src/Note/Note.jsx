import React, { Component } from 'react';
import './Note.css';

class Note extends Component {

	constructor(props) {
		super(props);
		this.noteContent = props.noteContent;
		this.noteId = props.noteId;
	}

	handleRemoveNote(id) {
		this.props.removeNote(id);
	}

	handleClickNote(id, noteContent)
	{
		this.props.clickNote(id, noteContent)
	}

	render(props) {
		return (
			<div className="Note">
				<div
					className="btn-close"
					onClick={() => this.handleRemoveNote(this.noteId)}
				>
				&times;
				</div>
				<div className="noteContent" onClick={() => this.handleClickNote(this.noteId, this.noteContent)}>{this.noteContent}</div>
			</div>
		)
	}

}

export default Note;