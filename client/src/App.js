import React, {Component} from 'react';
import './App.css';
import {withRouter} from 'react-router-dom'
import Header from './components/Header';
import axios from "axios/index";
import {getLogout} from "./services/axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            user: null
        }
    }

    componentDidMount() {
        this.checkAuthentication()
    }

    checkAuthentication = () => {
        return axios.get('/checkAuth')
            .then((res) => {
                if (res.data.user) {
                    this.setState({
                        isLogged: true,
                        user: res.data.user
                    });
                    const serializedUser = JSON.stringify(res.data);
                    localStorage.setItem('user', serializedUser);
                }
            })
    };

    onLogout = () => {
        this.setState({
            isLogged: null,
            user: null
        });
        localStorage.clear();
        getLogout();
        window.location = "/"
    };

    render() {
        return (
            <div id="wrapper">
                <div>
                    <Header isLogged={this.state.isLogged}
                            onLogout={this.onLogout}
                    />
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default withRouter(App);