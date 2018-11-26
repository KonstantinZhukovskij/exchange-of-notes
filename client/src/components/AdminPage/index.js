import React from 'react';
import {getAllUsers, getPaginationSummaries} from '../../services/axios';
import UsersTable from '../UsersTable';
import SummariesTable from '../SummariesTable';

export default class AdminPage extends React.Component {
    state = {
        users: [],
        summaries: []
    };

    componentWillMount() {
        getAllUsers()
            .then((res) => {
                this.setState({
                    users: res.data
                });
            });
        getPaginationSummaries()
            .then((res) => {
                this.setState({
                    summaries: res.data.summaries
                })
            })
    }

    updateSummaries = () => {
        getPaginationSummaries()
            .then((res) => {
                this.setState({
                    summaries: res.data.summaries
                })
            })
    };

    updateUsers = () => {
        getAllUsers()
            .then((res) => {
                this.setState({
                    users: res.data
                })
            })
    };

    render() {
        return (
            <div>
                <div className="sign">
                    <form>
                        <div className="container registration">
                            <h1>Панель администратора</h1>
                            <h2>Список всех пользователей</h2>

                            {this.state.users.map((user, index) =>
                                <UsersTable id={user.id}
                                            email={user.email}
                                            key={index}
                                            updateUsers={this.updateUsers}
                                />
                            )}
                        </div>
                    </form>
                    <hr/>
                    <div className="container registration">
                        <form>
                            <h2>Список конспектов</h2>
                            {this.state.summaries.map((summary, index) =>
                                <SummariesTable id={summary.id}
                                                title={summary.title}
                                                key={index}
                                                updateSummaries={this.updateSummaries}
                                />
                            )}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}