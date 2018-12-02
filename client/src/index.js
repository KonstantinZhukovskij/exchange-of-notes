import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom'
import './index.css';
import App from './App';
import Main from './components/Main';
import AboutUsPage from './components/AboutUsPage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import CreateSummariesPage from "./components/CreateSummariesPage";
import UserPage from "./components/UserPage";
import NotFoundPage from "./components/NotFoundPage";
import AdminPage from "./components/AdminPage";
import SinglePost from "./components/SinglePost";

const returnUser = JSON.parse(localStorage.getItem("user"));

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/registration" render={() => {
                    return returnUser ? <Redirect to={'/'}/> : <RegistrationPage/>
                }}/>
                <Route exact path="/summary/:id" component={SinglePost}/>
                <Route exact path="/create" render={() => {
                    return returnUser ? <CreateSummariesPage/> : <Redirect to={'/registration'}/>
                }}/>
                <Route exact path="/about" component={AboutUsPage}/>
                <Route exact path="/account/profile" render={() => {
                    const returnUser = JSON.parse(localStorage.getItem("user"));
                    return returnUser ? <UserPage/> : <Redirect to={'/login'}/>
                }}/>
                <Route exact path="/admin" render={() => {
                    console.log(returnUser)
                    return returnUser && returnUser.isAdmin ? <AdminPage/> : <Redirect to={'/'}/>
                }}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </App>
    </BrowserRouter>, document.getElementById('root'));