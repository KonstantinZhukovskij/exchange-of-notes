import React, {Component} from 'react';
import './App.css';
import {withRouter} from 'react-router-dom'
import Header from './components/Header';

class App extends Component {

    render() {
        return (
            <div id="wrapper">
                <div>
                    <Header/>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default withRouter(App);