import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header'

export default class Movie extends Component {

	constructor(props) {
		super(props);
		this.state = { movies: [] }
	}

	componentDidMount() {
		const { id } = this.props.match.params
		axios.get(`/api/movie/${id}`)
		.then(res => {
			const movies = res.data;
			this.setState({ movies });
		})
	}

	render() {
		let movie = this.state.movies;
		let poster = 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
			overview = movie.overview,
			generos = "",
			background = 'https://image.tmdb.org/t/p/original' + movie.backdrop_path;

		if(movie.poster_path== null){
			poster = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g';
		}
		if(!movie.overview) {
			overview = "Description not available";
		}
		if(movie.backdrop_path) {
			document.body.style.backgroundImage = 'url(' + background + ')';
		}
		if (movie.genres) {
			let genres = movie.genres;
			for(var i=0; i < genres.length; i++) {
    			generos += genres[i].name;
    			if(i < genres.length-1) {
    				generos += ', ';
    			}
			}
			if(genres.length == 0) {
				generos = "Not available";
			}
		}
		return (
			<div>
				<Header/>
				<div className="col-xs-12 p-2 cardparent" key={movie.id}>
					<div className="container">
						<div className="row">
							<div className="col-sm-4">
								<img className='poster' src={poster} width="100%"/>
							</div>
							<div className="col-sm-8 cardtest">
								<h1>{movie.original_title}</h1>
								<p>{overview}</p>
					            <div className="row nopadding release-details p-3">
					                <span className="meta-data tagline pr-3"><strong>Release:</strong> {movie.release_date}</span>
					                <span className="genre-list tagline"><strong>Genres:</strong> {generos}</span>
					            </div>
							</div>
						</div>
					</div>
				</div>
			</div> 
			)
	}
}