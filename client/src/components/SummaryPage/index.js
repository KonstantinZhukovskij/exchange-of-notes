import React from 'react';
import {getAllSummaries} from '../../services/axios'

export default class Index extends React.Component {

    onClickGetAllSummaries = (event) => {
        event.preventDefault();
        getAllSummaries()
    };

    render() {
        return (
            <div className="singlePage">
                <form id="searchSummaries">
                    <input type="text"
                           placeholder="Search"
                           className="searchInput"/>
                    <button className="summ"
                            onClick={this.onClickGetAllSummaries}>Поиск
                    </button>
                </form>
            </div>
        );
    }
}