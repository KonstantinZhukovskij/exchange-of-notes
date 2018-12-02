import React from 'react';
import {Link} from 'react-router-dom';
import toastr from '../../services/toastr'
import UserSummaries from "../UserSummaries";
import {getAllAuthorSummaries, getUserById, putUpdateAccount, putUpdatePassword} from '../../services/axios'

export default class UserPage extends React.Component {
    state = {
        user: JSON.parse(localStorage.getItem("user")),
        id: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        gender: '',
        location: '',
        createdAt: '',
        updatedAt: '',
        allUserSummaries: []
    };

    componentWillMount() {
        getUserById(this.state.user.id)
            .then((res) => {
                this.setState({
                    id: res.data.id,
                    email: res.data.email,
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    gender: res.data.gender,
                    location: res.data.location,
                    createdAt: res.data.createdAt,
                    updatedAt: res.data.updatedAt
                })
            });
        getAllAuthorSummaries(this.state.user.id)
            .then((res) => {
                this.setState({
                    allUserSummaries: res.data
                })
            })
    }

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
        let userData = {
            id: this.state.id,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            gender: this.state.gender,
            location: this.state.location,
        };
        putUpdateAccount(userData)
            .then((res) => {
                this.setState({
                    firstName: res.data.firstName,
                    lastName: res.data.lastName,
                    gender: res.data.gender,
                    location: res.data.location,
                });
                toastr.success("Ваши данные успешно изменены", "Успех!");
            })
            .catch((error) => {
                toastr.warning('Что то пошло не так, обновите страницу', 'Внимание!')
            });
    };

    onClickUpdatePassword = (event) => {
        event.preventDefault();
        if (this.state.password && this.state.confirmPassword !== null) {
            let passwordData = {
                id: this.state.id,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
            };
            putUpdatePassword(passwordData)
                .then(() => {
                    this.setState({
                        password: '',
                        confirmPassword: ''
                    });
                    toastr.success("Ваш пароль успешно изменён", "Успех!");
                })
                .catch((error) => {
                    toastr.error('Вы неверно ввели повторный пароль', 'Ошибка!')
                });
        } else {
            toastr.error('Пароль не может быть пустой', 'Ошибка!')
        }
    };

    updateSummaries = () => {
        getAllAuthorSummaries(this.state.user.id)
            .then((res) => {
                this.setState({
                    allUserSummaries: res.data ? res.data : []
                })
            })
    };

    render() {
        return (
            <div>
                <div className="sign">
                    <form>
                        <div className="container registration">
                            <h1>Ваш аккаунт</h1>
                            <div id="adminRoom">
                                {this.state.user.isAdmin && <Link to={'/admin'} id="adminLink">
                                    <button className="fas fa-crown">Кабинет администратора</button>
                                </Link>}
                            </div>
                            <label><b>Эл. адрес</b></label>
                            <input type="text"
                                   value={this.state.email} disabled/>
                            <label><b>Дата создания аккаунта</b></label>
                            <input type="text"
                                   value={this.state.createdAt.slice(0, -14)} disabled/>
                            <label><b>Дата последнего изменения</b></label>
                            <input type="text"
                                   value={this.state.updatedAt.slice(0, -14)} disabled/>
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
                    <hr/>
                    <div className="container registration">
                        <form>
                            <h2>Ваши конспекты</h2>
                            {this.state.allUserSummaries.map((summary, index) =>
                                <UserSummaries id={summary.id}
                                               title={summary.title}
                                               updateSummaries={this.updateSummaries}
                                               key={index}
                                />)}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}