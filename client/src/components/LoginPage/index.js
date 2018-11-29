import React from 'react';
import {facebookLogin, login} from '../../services/axios';
import toastr from '../../services/toastr';

export default class LoginPage extends React.Component {
    state = {
        email: '',
        password: '',
    };

    onChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    };

    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    };

    onClickFacebookLogin = (event) => {
        event.preventDefault();
        facebookLogin()
            .then((res) => {
                console.log(res)
            }).catch((error) => {
            console.log(error)
        })
    };


    onClickLogin = (event) => {
        event.preventDefault();
        login(this.state)
            .then((res) => {
                const serializedUser = JSON.stringify(res.data);
                localStorage.setItem('user', serializedUser);
                toastr.success(`Вы успешно вошли как ${res.data.email}`, "Успех!");
                setTimeout(() => window.location = "/", 1000);
            }).catch((error) => {
            toastr.error('Вы ввели не верные данные, или заполнили не все поля', 'Ошибка!')
        })
    };

    render() {
        return (
            <div className="sign">
                <div className="container login">
                    <form>
                        <div className="row">
                            <h1>Войти</h1>
                            <div className="vl">
                            </div>
                            <div className="col">
                                <a className="vk btn">
                                    <i className="fa fa-vk fa-fw"/> Войти с помощью VK
                                </a>
                                <a href="http://localhost:3001/auth/facebook" className="fb btn">
                                    <i className="fa fa-facebook fa-fw"/> Войти с помощью Facebook
                                </a>
                                <a className="twitter btn">
                                    <i className="fa fa-twitter fa-fw"/> Войти с помощью Twitter
                                </a>
                            </div>
                            <div className="col">
                                <input type="text"
                                       placeholder="Логин"
                                       onChange={this.onChangeEmail}
                                       value={this.state.email}
                                       required/>
                                <input type="password"
                                       placeholder="Пароль"
                                       onChange={this.onChangePassword}
                                       value={this.state.password}
                                       required/>
                                <button className="fas fa-sign-in-alt" id='loginButton'
                                        onClick={this.onClickLogin}>Войти
                                </button>
                                <a href="URL" className="btn" id="forgot">Забыли пароль?</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}