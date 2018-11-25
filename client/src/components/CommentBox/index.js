import React from 'react';

export default class CommentBox extends React.Component {
    render() {
        let author;
        if (this.props.lastName && this.props.firstName) {
            author = this.props.lastName + ' ' + this.props.firstName;
        } else {
            author = "Аноним"
        }
        return (
            <div>
                <p>{this.props.comment}</p>
                <p>Автор: {author}</p>
            </div>
        );

    }
}