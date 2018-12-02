import React from 'react';
import {deleteSummaryById} from "../../services/axios";
import toastr from "../../services/toastr";

export default class UserSummaries extends React.Component {

    onClickDeleteSummary = (event) => {
        event.preventDefault();
        deleteSummaryById(this.props.id)
            .then(() => {
                this.props.updateSummaries();
                toastr.success("Конспект успешно удалён");
            })
    };

    render() {
        console.log(this.props);
        return (
            <div>
                <div className="sign">
                    <input type="text"
                           value={this.props.title}
                           disabled/>
                    <button id="deleteSummary" className="fas fa-trash-alt"
                            onClick={this.onClickDeleteSummary}>Удалить
                    </button>
                </div>
            </div>
        );
    }
}