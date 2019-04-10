import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'


export default class Pagination extends Component {

	constructor(props) {
		super(props);
		this.state = { total: undefined } ;

	}

	createPagination() {
		axios.get(`/api/movie/pagination`)
		.then(res => {
			const total = res.data;
			this.setState({total});
		})
		let pages = this.state;
		let pagination = '';
		for (let i = 1; i <= pages.total; i++) {
			pagination += '<a href=/' + i + ' key='+i+'>' + i + '</a> ';
		}
		return pagination;
	}

	render() {
		return (
			<div className='tagline text-center' dangerouslySetInnerHTML={{__html: this.createPagination()}}>
			</div> 
			)
	}
}