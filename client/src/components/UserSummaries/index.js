import React from 'react';

export default class UserSummaries extends React.Component {

    onClickDeleteSummary = (event) => {
        event.preventDefault();
        this.props.deleteSummary(this.props.id)
    };

    render() {
        return (
            <div>
                <div className="sign">
                    <input type="text"
                           value={this.props.description}
                           disabled/>
                    <button id="deleteSummary" className="fas fa-trash-alt"
                            onClick={this.onClickDeleteSummary}>Удалить
                    </button>
                </div>
            </div>
        );
    }
}