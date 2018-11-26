import React from 'react';
import toastr from '../../services/toastr'
import {putUpdateAccount, putUpdatePassword} from '../../services/axios'

export default class UserPage extends React.Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        gender: '',
        location: '',
        createdAt: '',
        updatedAt: ''
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

    onChangeFirstName = (event) => {
        this.setState({
            firstName: event.target.value
        })
    };

    onChangeLastName = (event) => {
        this.setState({
            lastName: event.target.value
        })
    };

    onChangeGender = (event) => {
        this.setState({
            gender: event.target.value
        })
    };

    onChangeLocation = (event) => {
        this.setState({
            location: event.target.value
        })
    };

    onClickUpdateAccount = (event) => {
        event.preventDefault();
        putUpdateAccount(this.state)
            .then((res) => {
                this.setState({
                    firstName: '',
                    lastName: '',
                    gender: '',
                    location: '',
                });
                toastr.success("Ваши данные успешно изменены", "Поздравляем!");
            })
            .catch((error) => {
                toastr.warning('Что то пошло не так, обновите страницу', 'Внимание!')
            });
    };

    onClickUpdatePassword = (event) => {
        event.preventDefault();
        if (this.state.password && this.state.confirmPassword !== null) {
            putUpdatePassword(this.state)
                .then((res) => {
                    this.setState({
                        password: '',
                        confirmPassword: ''
                    });
                    toastr.success("Ваш пароль успешно изменён", "Поздравляем!");
                })
                .catch((error) => {
                    toastr.error('Вы неверно ввели повторный пароль', 'Ошибка!')
                });
        } else {
            toastr.error('Пароль не может быть пустой', 'Ошибка!')
        }
    };

    render() {
        this.returnUser = JSON.parse(localStorage.getItem("user"));
        return (
            <div>
                <div className="sign">
                    <form>
                        <div className="container registration">
                            <h1>Ваш аккаунт</h1>
                            <label><b>Эл. адрес</b></label>
                            <input type="text"
                                   value={this.returnUser.email} disabled/>
                            <label><b>Дата создания аккаунта</b></label>
                            <input type="text"
                                   value={this.returnUser.createdAt.slice(0, -14)} disabled/>
                            <label><b>Дата последнего изменения</b></label>
                            <input type="text"
                                   value={this.returnUser.updatedAt.slice(0, -14)} disabled/>
                            <label><b>Имя</b></label>
                            <input type="text"
                                   onChange={this.onChangeFirstName}
                                   value={this.state.firstName}
                                   placeholder="Введите Ваше имя"/>
                            <label><b>Фамилия</b></label>
                            <input type="text"
                                   onChange={this.onChangeLastName}
                                   value={this.state.lastName}
                                   placeholder="Введите Вашу фамилию"/>
                            <label><b>Пол</b></label>
                            <input type="text"
                                   onChange={this.onChangeGender}
                                   value={this.state.gender}
                                   placeholder="Введите Ваш пол"/>
                            <label><b>Город</b></label>
                            <input type="text"
                                   onChange={this.onChangeLocation}
                                   value={this.state.location}
                                   placeholder="Введите Ваш город"/>
                            <button className="far fa-thumbs-up" onClick={this.onClickUpdateAccount}>Применить</button>
                        </div>
                    </form>
                    <hr/>
                    <div className="container registration">
                        <form>
                            <h2>Изменить пароль</h2>
                            <label><b>Новый пароль</b></label>
                            <input type="password"
                                   onChange={this.onChangePassword}
                                   value={this.state.password}
                                   placeholder="Введите новый пароль"
                                   required/>
                            <label><b>Повторите пароль</b></label>
                            <input type="password"
                                   onChange={this.onChangeConfirmPassword}
                                   value={this.state.confirmPassword}
                                   placeholder="Повторите новый пароль"
                                   required/>
                            <button className="fas fa-key" onClick={this.onClickUpdatePassword}>Изменить</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}