import React, { Component } from "react";
import ReactDOM from "react-dom";
const logo = "/tmdb.svg";

export default class SearchBox extends Component {
	handleChange(event) {
		event.target.select();
	}
	render() {
		return (
			<div className="col-xs-12 search-container nopadding">
				<div className="row">
					<div className="col-xs-12 col-sm-6 col-lg-5">
							<img src={logo} className="logo" alt="The Movie Database" />
					</div>
					<div className="col-xs-12 col-sm-6 col-lg-7">
						<form className="searchbox">
							<input
								ref="search suggestion"
								onClick={this.handleChange}
								className="searchbox__input typeahead form-control"
								type="text"
								placeholder="Search partial or entire movie title"
								id="q"
							/>
						</form>
					</div>
				</div>
			</div>
		);
	}
}
