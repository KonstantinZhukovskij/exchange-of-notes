import React from 'react';

export default class Pagination extends React.Component {
    render() {
        return (
            <ul className="actions">
                <li><a href="/" className="disabled button large previous">Предыдущая страница</a></li>
                <li><a href="/" className="button large next">Следующая страница</a></li>
            </ul>
        );
    }
}