import React, { Component } from "react";
import ReactDOM from "react-dom";
const logo = "/tmdb.svg";

export default class Header extends Component {
	handleChange(event) {
		event.target.select();
	}
	render() {
		return (
			<div className="col-xs-12 search-container nopadding">
				<div className="row">
					<div className="col-xs-12 col-sm-6 col-lg-5">
							<a href="/"><img src={logo} className="logo" alt="The Movie Database" /></a>
					</div>
					<div className="col-xs-12 col-sm-6 col-lg-7 text-center">
						<a href="/"><div className="btn btn-success">Go Back</div></a>
					</div>
				</div>
			</div>
		);
	}
}
