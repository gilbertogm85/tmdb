import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import axios from "axios";
import SearchBox from './search/SearchBox';
import Pagination from './Pagination';
require('./typeahed/typeahead.js');
require('./typeahed/bloodhound.js');


export default class Main extends Component {

	constructor(props) {
		super(props);
		let page = 1;
		this.state = { movies: [] }
		this.routeChange = this.routeChange.bind(this);
	}

	routeChange(movieID) {
		let path = `movie/${movieID}`;
		this.props.history.push(path);
	}
	
	componentDidMount() {
		if(this.props.match) {
			const { page } = this.props.match.params
			axios
			.get(`/api/movie/upcoming/${page}`)
			.then(res => { return res.data })
			.then(movies => {
				this.setState({ movies });
			})
			.catch(error => console.log(error));
		}

		let suggests = new Bloodhound({
			datumTokenizer: function(datum) {
				return Bloodhound.tokenizers.whitespace(datum.value);
			},
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			remote: {
				url: '/api/movie/search/%QUERY',
				filter: function(movies) {
					return $.map(movies.results, function(movie) {
						return {
							value: movie.original_title, 
							id: movie.id 
						};
					});
				} 
			} 
		}); 

		suggests.initialize(); 


		$('.typeahead').typeahead({
			hint: true,
			highlight: true,
			minLength: 2
		}, {source: suggests.ttAdapter()}).on('typeahead:selected', function(obj, datum) {
			this.routeChange(datum.id)
		}.bind(this)); 
	}

	renderMovies() {
		return this.state.movies.map(movie => {
			let posterIMG = 'https://image.tmdb.org/t/p/w500' + movie.poster_path,
			overview = movie.overview,
			generos = '';
			if(movie.poster_path== null){
				posterIMG = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSols5HZxlQWyS9JY5d3_L9imbk0LiziHiyDtMZLHt_UNzoYUXs2g';
			}
			if(!movie.overview) {
				overview = "Description not available";
			}

			return (
				<div className="col-xs-12 p-2 cardparent" key={movie.id}>
					<Link to={`/movie/${movie.id}`}>
					<div className="container">
						<div className="row">
							<div className="col-sm-3">
								<img className='poster' src={posterIMG} width="100%"/>
							</div>
							<div className="col-sm-9 cardtest">
								<h1>{movie.original_title}</h1>
					            <div className="row nopadding release-details p-3">
					                <span className="meta-data tagline pr-3"><strong>Release:</strong> {movie.release_date}</span>
					                <span className="genre-list tagline"><strong>Genres:</strong> {movie.genres}</span>
					            </div>
							</div>
						</div>
					</div>
					</Link>
				</div>
				);
		})
	}

	render() {
		return (
			<div>
				<SearchBox/>
				<Pagination/>
				<div className="tagline">
					<h1>Upcoming Movies</h1>
				</div>
				{ this.renderMovies() }
			</div> 

			);
	}

}

if (document.getElementById('app')) {
	ReactDOM.render(<Main />, document.getElementById('app'));
}

