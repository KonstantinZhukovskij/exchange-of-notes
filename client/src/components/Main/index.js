import React from 'react';
import MainPost from '../MainPost';
import Pagination from '../Pagination';
import SideBar from '../SideBar';
import {getAllCommentsToSummary, getAllSummaries} from '../../services/axios'

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            summaries: []
        }
    };

    componentWillMount() {
        getAllSummaries()
            .then((res) => {
                const summaries = res.data;
                const promiseArray = summaries.map((summary, index) => {
                    return getAllCommentsToSummary(summary.id)
                });
                Promise.all(promiseArray)
                    .then((allComments) => {
                        summaries.forEach((item, index) => {
                            item.commentCount = allComments[index].data.length;
                        });
                        this.setState({summaries: summaries});
                    });
            });
    }

    render() {
        return (
            <div id="main">
                <SideBar object={this.state.summaries}/>
                <div className="rightBar">
                    {this.state.summaries.sort((a, b) => b.id - a.id).map((summary, index) =>
                        <MainPost id={summary.id}
                                  firstName={summary.User.firstName}
                                  lastName={summary.User.lastName}
                                  title={summary.title}
                                  description={summary.description}
                                  text={summary.text}
                                  createdAt={summary.createdAt}
                                  commentCount={summary.commentCount}
                                  likes={summary.likes.length}
                                  key={index}/>
                    )}
                    <Pagination/>
                </div>
            </div>
        );
    }
}