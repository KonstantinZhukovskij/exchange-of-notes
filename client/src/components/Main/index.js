import React from 'react';
import MainPost from '../MainPost';
import Pagination from '../Pagination';
import SideBar from '../SideBar';
import {getAllCommentsToSummary, getPaginationSummaries, getPopularSummaries} from '../../services/axios'

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            summaries: [],
            popularSummaries: [],
            limit: 2,
            offset: 0,
            count: 0
        }
    };

    componentWillMount() {
        getPaginationSummaries(this.state.limit, this.state.offset)
            .then((res) => {
                const summaries = res.data.summaries;
                this.setState({
                    count: res.data.count
                });
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
                getPopularSummaries()
                    .then((res) => {
                        this.setState({
                            popularSummaries: res.data
                        })
                    })
            });
    }

    changeOffsetUp = () => {
        this.setState({
            offset: this.state.offset + this.state.limit
        }, () => {
            if (this.state.offset + this.state.limit <= this.state.count) {
                getPaginationSummaries(this.state.limit, this.state.offset)
                    .then((res) => {
                        this.setState({
                            summaries: res.data.summaries
                        })
                    })
            }
        })
    };

    changeOffsetDown = () => {
        this.setState({
            offset: this.state.offset - this.state.limit
        }, () => {
            if (this.state.offset >= 0) {
                getPaginationSummaries(this.state.limit, this.state.offset)
                    .then((res) => {
                        this.setState({
                            summaries: res.data.summaries
                        })
                    })
            }
        })
    };

    render() {
        return (
            <div id="main">
                <SideBar object={this.state.popularSummaries}/>
                <div className="rightBar">
                    {this.state.summaries.map((summary, index) =>
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
                    <Pagination limit={this.state.limit}
                                offset={this.state.offset}
                                onClickPaginationPrevious={this.changeOffsetDown}
                                onClickPaginationNext={this.changeOffsetUp}
                    />
                </div>
            </div>
        );
    }
}