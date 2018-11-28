import React from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom';
import {getLogout, sendSearchQuery} from '../../services/axios';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUser: false,
            searchQuery: 'Протеасома'
        };
    }

    componentWillMount() {
        this.localUser = localStorage.getItem('user');
        if (this.localUser !== null) {
            this.setState({
                isUser: true,
            })
        } else {
            this.setState({
                isUser: false,
            })
        }
    }

    onChangeSearchQuery = (event) => {
        this.setState({
            searchQuery: event.target.value
        });
        console.log(this.state.searchQuery)
    };

    onClickSearchQuery = (event) => {
        event.preventDefault();
        sendSearchQuery(this.state.searchQuery)
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
    };

    handleSearchClick = (event) => {
        event.preventDefault();
        let $search = $('#search');
        let $search_input = $search.find('input');

        if (!$search.hasClass('visible')) {
            $search[0].reset();
            $search.addClass('visible');
            $search_input.focus();
        }
        $search_input.on('keydown', (event) => {
            if (event.keyCode === 27) {
                $search_input.blur();
            }
        }).on('blur', () => {
            window.setTimeout(() => {
                $search.removeClass('visible');
            }, 100);
        });
    };


    onClickLogout = (event) => {
        event.preventDefault();
        localStorage.clear();
        getLogout();
        this.setState({
            isUser: false,
        });
        window.location = "/"
    };

    render() {
        return (
            <header id="header">
                <h1><Link to="/">Summaries</Link></h1>
                <nav className="links">
                    <ul>
                        <li>
                            <Link to="/create">Создать</ Link>
                        </li>
                        <li>
                            <Link to="/summary">Конспекты</ Link>
                        </li>
                        <li><a href="https://gitter.im/Room-with-notes/Summary"
                               target="_blank"
                               rel="noopener noreferrer">Чат</a></li>
                    </ul>
                </nav>
                <nav className="main">
                    <ul>
                        <li className="search">
                            <a className="fa-search"
                                // onClick={this.handleSearchClick}
                               onClick={this.onClickSearchQuery}
                               title="Поиск">Поиск</a>
                            <form id="search">
                                <input type="text"
                                       onChange={this.onChangeSearchQuery}
                                       name="query"
                                       placeholder="Поиск"/>
                            </form>
                        </li>
                        <li className="menu">
                            {this.state.isUser ?
                                <Link className="fa-home" to="/account/profile" title="Домашняя">Домашняя</Link> :
                                <Link className="fa-user-plus" to="/registration"
                                      title="Регистрация">Регистрация</Link>}
                        </li>
                        <li className="menu">
                            {this.state.isUser ?
                                <Link className="fa-sign-out" to="/logout" onClick={this.onClickLogout}
                                      title="Выйти">Выйти</Link> :
                                <Link className="fa-sign-in" to="/login" title="Войти">Войти</Link>}
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}