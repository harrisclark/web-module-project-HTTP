import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';


import axios from 'axios';

const AddMovieForm = (props) => {
	const { push } = useHistory();

	const { setMovies } = props;
	const [movie, setMovie] = useState({
		title:"",
		director: "",
		genre: "",
		metascore: 0,
		description: ""
	});



	const handleSubmit = (e) => {
		e.preventDefault()
		axios.post(`http://localhost:9000/api/movies`, movie)
			.then(res => {
				//console.log(res.data)
				setMovies(res.data)
				push('/movies')
			})
	}

	const handleChange = (e) => {
		setMovie({
			...movie,
			[e.target.name]: e.target.value
		});
	}
	
	const { title, director, genre, metascore, description } = movie;
	const isDisabled = title.trim() && director.trim() && genre.trim() && description.trim()

    return (
	<div className="col">
		<div className="modal-content">
			<form onSubmit={handleSubmit}>
				<div className="modal-header">						
					<h4 className="modal-title">Add a New Movie</h4>
				</div>
				<div className="modal-body">					
					<div className="form-group">
						<label>Title</label>
						<input value={title} onChange={handleChange} name="title" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Director</label>
						<input value={director} onChange={handleChange} name="director" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Genre</label>
						<input value={genre} onChange={handleChange} name="genre" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Metascore</label>
						<input value={metascore} onChange={handleChange} name="metascore" type="number" className="form-control"/>
					</div>		
					<div className="form-group">
						<label>Description</label>
						<textarea value={description} onChange={handleChange} name="description" className="form-control"></textarea>
					</div>
									
				</div>
				<div className="modal-footer">			    
					<input disabled={!isDisabled} type="submit" className="btn btn-info" value="Add"/>
					<Link to={`/movies`}><input type="button" className="btn btn-default" value="Cancel"/></Link>
				</div>
			</form>
		</div>
	</div>);
}

export default AddMovieForm;