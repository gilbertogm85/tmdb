import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'


export default class Pagination extends Component {

	constructor(props) {
		super(props);
		this.state = { total: undefined, pagination: undefined} ;
	}

	componentDidMount() {
		axios.get(`/api/movie/pagination`)
		.then(res => { return res.data })
			.then(pagination => {
				this.setState({ pagination });
			})
			.catch(error => console.log(error));
	}

	render() {
		let pages = '';
		for (let i = 1; i <= this.state.pagination; i++) {
				pages += '<a href=/' + i + ' key='+i+'>' + i + '</a> ';
			}
		return (
			<div className='tagline text-center' dangerouslySetInnerHTML={{__html: pages}}>
			</div> 
			)
	}
}