import React, {Component} from 'react';
import './App.css';
import {withRouter} from 'react-router-dom'
import Header from './components/Header';
import GuestHeader from './components/GuestHeader';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHeader: true,
        };
    }

    componentWillMount() {
        this.localUser = localStorage.getItem('user');
        if (this.localUser !== null) {
            this.setState({
                isHeader: true,
            })
        } else {
            this.setState({
                isHeader: false,
            })
        }
    }

    render() {
        return (
            <div id="wrapper">
                <div>
                    {this.state.isHeader ? <Header/> : <GuestHeader/>}
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default withRouter(App);