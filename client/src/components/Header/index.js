import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {sendSearchQuery} from '../../services/axios';

const CreateButton = () => (
    <li>
        <Link to="/create">Создать</ Link>
    </li>
);

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isUser: false,
            searchQuery: ''
        };
    }

    componentWillMount() {
        this.localUser = localStorage.getItem('user');
        if (this.localUser) {
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
    };

    onClickSearchQuery = (event) => {
        event.preventDefault();
        sendSearchQuery(this.state.searchQuery)
            .then((res) => {
                this.props.history.push({
                    pathname: '/',
                    state: {summaries: res.data}
                })
            })
            .catch((error) => {
                console.log(error)
            })
    };

    onClickLogout = (event) => {
        event.preventDefault();
        this.props.onLogout()
    };

    renderButtonIfUserIsLogged = () => {
        return (
            [<li className="menu" key={'houseLink'}>
                <Link className="fa-home" to="/account/profile" title="Личный кабинет">Личный кабинет</Link>
            </li>, <li className="menu" key={'logoutLink'}>
                <Link className="fa-sign-out menu" to="/logout" onClick={this.onClickLogout}
                      title="Выйти">Выйти</Link>
            </li>]
        )
    };

    renderButtonIfUserIsGuest = () => {
        return (
            [
                <li className="menu" key={'registerLink'}>
                    <Link className="fa-user-plus" to="/registration"
                          title="Регистрация">Регистрация</Link>
                </li>,
                <li className="menu" key={'loginLink'}>
                    <Link className="fa-sign-in" to="/login" title="Войти">Войти</Link>
                </li>
            ]
        )
    };

    render() {
        return (
            <header id="header">
                <h1><Link to="/">Summaries</Link></h1>
                <nav className="links">
                    <ul>
                        {this.state.isUser && <CreateButton/>}
                        <li><a href="https://gitter.im/Room-with-notes/Summary"
                               target="_blank"
                               rel="noopener noreferrer">Чат</a></li>
                    </ul>
                </nav>
                <nav className="main">
                    <ul>
                        <li className="search visible">
                            <a className="fa-search"
                               onClick={this.onClickSearchQuery}
                               title="Поиск">Поиск</a>
                            <form id="search" className="visible" onSubmit={this.onClickSearchQuery}>
                                <input type="text"
                                       onChange={this.onChangeSearchQuery}
                                       name="query"
                                       placeholder="Поиск"/>
                            </form>
                        </li>
                        {
                            this.props.isLogged
                                ? this.renderButtonIfUserIsLogged()
                                : this.renderButtonIfUserIsGuest()
                        }
                    </ul>
                </nav>
            </header>
        );
    }
}

export default withRouter(Header);