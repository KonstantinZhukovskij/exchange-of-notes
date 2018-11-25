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
                <Link to={"summary/" + this.props.id} className="image"><img
                    src="https://cs6.pikabu.ru/post_img/big/2017/09/05/7/1504605947158114655.jpg" alt=""/></Link>
            </article>
        );
    }
}