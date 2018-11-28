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
        this.props.onClickPaginationNext();
    };

    onClickPreviousPage = (event) => {
        event.preventDefault();
        this.props.onClickPaginationPrevious();
    };

    render() {
        const isNextButtonDisabled = this.props.offset + this.props.limit > this.props.count;
        const isPreviousButtonDisabled = this.props.offset <= 0;
        return (
            <ul className="actions">
                <li><a className={isPreviousButtonDisabled ? 'button large previous disabled' : 'button large previous'}
                       onClick={this.onClickPreviousPage}>
                    Предыдущая страница</a></li>
                <li><a className={isNextButtonDisabled ? 'disabled button large next' : 'button large next'}
                       onClick={this.onClickNextPage}>Следующая страница</a></li>
            </ul>
        );
    }
}