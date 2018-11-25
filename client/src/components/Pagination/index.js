import React from 'react';

export default class Pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            limit: this.props.limit,
            offset: this.props.offset
        }
    };

    onClickNextPage = (event) => {
        event.preventDefault();
        this.props.onClickPaginationNext()
    };

    onClickPreviousPage = (event) => {
        event.preventDefault();
        this.props.onClickPaginationPrevious()
    };

    render() {
        return (
            <ul className="actions">
                <li><a className="button large previous" onClick={this.onClickPreviousPage}>
                    Предыдущая страница</a></li>
                <li><a className="button large next" onClick={this.onClickNextPage}>Следующая страница</a></li>
            </ul>
        );
    }
}