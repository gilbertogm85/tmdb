import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Main from './Main';
import Movie from './Movie';

export default class RoutePath extends Component{
    render(){
        return(
            <BrowserRouter>
                    <Switch>
                        <Route path="/:page?" exact component={Main}/>
                        <Route path='/movie/:id' exact component={Movie}/>
                    </Switch>
            </BrowserRouter>
        )
    }
}
ReactDOM.render(
    <RoutePath />
    , document.getElementById('app')
);