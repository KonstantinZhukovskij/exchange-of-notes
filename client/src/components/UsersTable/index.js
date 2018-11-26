import React from 'react';
import toastr from "../../services/toastr";
import {deleteUserById} from '../../services/axios'

export default class UsersTable extends React.Component {

    onClickDeleteUser = (event) => {
        event.preventDefault();
        deleteUserById(this.props.id)
            .then(() => {
                this.props.updateUsers();
                toastr.success("Пользователь успешно удалён");
            })
    };

    render() {
        return (
            <div>
                <div className="sign">
                    <input type="text"
                           value={this.props.email}
                           disabled/>
                    <button id="deleteUser" className="fas fa-user-times" onClick={this.onClickDeleteUser}>Удалить
                    </button>
                </div>
            </div>
        )
    }
}