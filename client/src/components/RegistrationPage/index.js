import React from 'react';
import toastr from "../../services/toastr";
import {Link, withRouter} from 'react-router-dom'
import {registration} from "../../services/axios";

class RegistrationPage extends React.Component {
    state = {
        email: '',
        password: '',
        confirmPassword: ''
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

    onChangeConfirmPassword = (event) => {
        this.setState({
            confirmPassword: event.target.value
        })
    };

    onClickRegistration = (event) => {
        event.preventDefault();
        registration(this.state)
            .then((res) => {
                toastr.success(`Вы успешно зарегистрированы ${res.data.email}`, "Успех!");
                setTimeout(() => this.props.history.push('http://localhost:3000/login'), 1000);
            })
            .catch((error) => {
                toastr.error('Вы ввели не верные данные, или заполнили не все поля', 'Ошибка!')
            });
    };

    render() {
        return (
            <div className="sign">
                <form>
                    <div className="container registration">
                        <h1>Регистрация</h1>
                        <label><b>Эл. адрес</b></label>
                        <input type="text"
                               placeholder="Введите электронный адрес"
                               onChange={this.onChangeEmail}
                               value={this.state.email}
                               required/>
                        <label><b>Пароль</b></label>
                        <input type="password"
                               placeholder="Введите пароль"
                               onChange={this.onChangePassword}
                               value={this.state.password}
                               required/>
                        <label><b>Повторите пароль</b></label>
                        <input type="password"
                               placeholder="Повторите пароль"
                               onChange={this.onChangeConfirmPassword}
                               value={this.state.confirmPassword}
                               required/>
                        <button className="fas fa-user-plus" onClick={this.onClickRegistration}>Регистрация</button>
                    </div>
                    <div className="container signin">
                        <p id="questionRegister">У Вас уже есть учетная запись?</p>
                        <Link to="/login">Войти</Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default withRouter(RegistrationPage);