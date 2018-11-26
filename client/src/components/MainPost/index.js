import React from 'react';
import {Link} from 'react-router-dom';

export default class MainPost extends React.Component {
    render() {
        const time = this.props.createdAt.substring(0, 10);
        let author;
        if (this.props.lastName && this.props.firstName) {
            author = this.props.lastName + ' ' + this.props.firstName;
        } else {
            author = "Аноним"
        }
        return (
            <article className="post summaries">
                <header>
                    <div className="title">
                        <Link to={"summary/" + this.props.id}><h2>{this.props.title}</h2></Link>
                        <p>{this.props.description}</p>
                    </div>
                    <div className="meta">
                        <p className="published">Дата создания: {time}</p>
                        <p className="author"><span
                            className="name">Автор: {author}</span></p>
                    </div>
                </header>
                <Link to={"summary/" + this.props.id} className="image featured">
                    <img src="https://cs6.pikabu.ru/post_img/big/2017/09/05/7/1504605947158114655.jpg" alt=""/>
                </Link>
                <footer>
                    <ul className="actions">
                        <Link to={"summary/" + this.props.id} className="button large">Прочитать</Link>
                    </ul>
                    <ul className="stats" id="ratings">
                        <li>Рейтинг</li>
                        <li>
                            <p className="icon fa-heart">{this.props.likes == null ? '0' : this.props.likes}</p>
                        </li>
                        <li>
                            <p className="icon fa-comment">{this.props.commentCount == null ? '0' : this.props.commentCount}</p>
                        </li>
                    </ul>
                </footer>
            </article>
        );
    }
}