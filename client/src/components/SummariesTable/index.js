import React from 'react';
import toastr from "../../services/toastr";
import {deleteSummaryById} from '../../services/axios'

export default class SummariesTable extends React.Component {

    onClickDeleteSummary = (event) => {
        event.preventDefault();
        deleteSummaryById(this.props.id)
            .then(() => {
                this.props.updateSummaries();
                toastr.success("Конспект успешно удалён");
            })
    };

    render() {
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