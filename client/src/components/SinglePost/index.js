import React from 'react';
import {withRouter} from 'react-router-dom'
import CommentBox from '../CommentBox'
import toastr from '../../services/toastr'
import PreviewSummary from "../PreviewSummary";
import {createComment, getAllCommentsToSummary, getSummaryById, putUpdateSummary} from "../../services/axios";

class SinglePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            title: '',
            description: '',
            text: '',
            authorId: '',
            summaryId: '',
            createdAt: '',
            comment: '',
            comments: [],
            likes: []
        };
    }

    componentWillMount() {
        getSummaryById(this.props.match.params.id)
            .then((res) => {
                this.setState({
                    ...res.data,
                    firstName: res.data.User.firstName,
                    lastName: res.data.User.lastName,
                    title: res.data.title,
                    description: res.data.description,
                    text: res.data.text,
                    createdAt: res.data.createdAt,
                    likes: [...res.data.likes, ...this.state.likes]
                });
            });
        getAllCommentsToSummary(this.props.match.params.id)
            .then((res) => {
                this.setState({
                    comments: res.data
                })
            })
    }

    onChangeComment = (event) => {
        this.setState({
            comment: event.target.value,
        })
    };

    onClickCreateComment = (event) => {
        event.preventDefault();
        const returnUser = JSON.parse(localStorage.getItem("user"));
        this.returnUser = localStorage.getItem('user');
        if (this.returnUser !== null) {
            const newComment = {
                text: this.state.comment,
                summaryId: this.props.match.params.id,
                authorId: returnUser.id
            };
            if (this.state.comment.length > 5) {
                createComment(newComment)
                    .then((res) => {
                        this.setState({
                            comment: ''
                        });
                        toastr.success("Ваш комментарий добавлен", "Поздравляем!");

                        getAllCommentsToSummary(this.props.match.params.id)
                            .then((res) => {
                                this.setState({
                                    comments: res.data,
                                })
                            })
                    })
            } else {
                toastr.error("Комментарий должен быть не менее 5 символов", "Ошибка!");
                this.setState({
                    comment: ''
                });
            }
        } else {
            toastr.error("Зарегистрируйтесь чтобы добавить комментарий", "Ошибка!");
            this.setState({
                comment: ''
            });
        }
    };

    onClickLike = (event) => {
        event.preventDefault();
        const returnUser = JSON.parse(localStorage.getItem("user"));
        this.returnUser = localStorage.getItem('user');
        if (this.returnUser !== null) {
            let newLikeArray = [...this.state.likes];
            if (newLikeArray.includes(returnUser.id)) {
                const index = newLikeArray.indexOf(returnUser.id);
                newLikeArray.splice(index, 1);
                toastr.error("Мне не нравится", "-1");
            } else {
                newLikeArray.push(returnUser.id);
                toastr.success("Мне нравится", "+1");
            }
            this.setState({
                likes: newLikeArray
            }, () => {
                putUpdateSummary(this.props.match.params.id, this.state)
            })
        } else {
            toastr.error("Зарегистрируйтесь чтобы добавить 'Мне нравится'", "Ошибка!");
        }
    };

    render() {
        const time = this.state.createdAt.substring(0, 10);
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
                        <h2>{this.state.title}</h2>
                        <p>{this.state.description}</p>
                    </div>
                    <div className="meta">
                        <p className="published">Дата создания: {time}</p>
                        <p className="author"><span className="name">Автор: {author}</span></p>
                    </div>
                </header>
                <a className="image featured">
                    <img src="https://cs6.pikabu.ru/post_img/big/2017/09/05/7/1504605947158114655.jpg" alt=""/>
                </a>
                <ul className="actions">
                    <div id="previewSummary">
                        <PreviewSummary text={this.state.text}/>
                    </div>
                </ul>
                <footer>
                    <h3>Комментарии</h3>
                    <ul className="stats">
                        <li>Мне нравится</li>
                        <li id="heart">
                            <a id="heartLength" className="icon fa-heart"
                               onClick={this.onClickLike}>{this.state.likes.length}</a>
                        </li>
                    </ul>
                </footer>
                <hr/>
                <form>
                    <div id="commentsInput">
                        {this.state.comments.map((comment, i) =>
                            <CommentBox id={comment.id}
                                        comment={comment.text}
                                        firstName={comment.User.firstName}
                                        lastName={comment.User.lastName}
                                        key={i}/>)}
                    </div>
                    <input type="text"
                           onChange={this.onChangeComment}
                           value={this.state.comment}/>
                    <button id="addComment" className="far fa-comment" onClick={this.onClickCreateComment}>
                        Добавить комментарий
                    </button>
                </form>
            </article>
        );
    }
}

export default withRouter(SinglePost);