import React from 'react';
import {Link} from 'react-router-dom';

export default class SideBarPost extends React.Component {
    render() {
        const time = this.props.createdAt.substring(0, 10);
        let author;
        if (this.props.lastName && this.props.firstName) {
            author = this.props.lastName + ' ' + this.props.firstName;
        } else {
            author = "Аноним"
        }
        return (
            <article className="mini-post">
                <header>
                    <Link to={"summary/" + this.props.id}><h3 id="sideBarTitle">{this.props.title}</h3></Link>
                    <p className="published">{time}</p>
                    <p>{author}</p>
                </header>
                <Link to={"summary/" + this.props.id} className="image" id="sideBarImage"><img
                    src={this.props.imageSrc} alt="summary"/></Link>
            </article>
        );
    }
}