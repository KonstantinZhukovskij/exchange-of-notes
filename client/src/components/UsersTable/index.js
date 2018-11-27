import React from 'react';
import toastr from "../../services/toastr";
import {createAdmin, deleteUser} from '../../services/axios'

export default class UsersTable extends React.Component {

    state = {
        user: this.props
    };

    onClickDeleteUser = (event) => {
        event.preventDefault();
        deleteUser(this.state.user.id)
            .then(() => {
                this.state.user.updateUsers();
                toastr.success("Пользователь успешно удалён");
            })
    };

    onClickCreateAdmin = (event) => {
        event.preventDefault();
        if (this.state.user.isAdmin === false) {
            this.setState({
                user: {
                    ...this.state.user,
                    isAdmin: true
                }
            }, () => {
                createAdmin(this.state)
                    .then((res) => {
                        this.state.user.updateUsers();
                        toastr.success("Пользователь назначен администратором");
                    })
            });
        }
        else {
            toastr.warning("Пользователь уже является администратором");
        }
    };

    render() {
        return (
            <div>
                <div className="sign">
                    <input type="text"
                           value={this.state.user.email}
                           disabled/>
                    <button id="deleteUser" className="fas fa-user-times" onClick={this.onClickDeleteUser}>Удалить
                    </button>
                    <button id="createAdmin" className="fas fa-crown" onClick={this.onClickCreateAdmin}>Назначить
                        администратором
                    </button>
                </div>
            </div>
        )
    }
}