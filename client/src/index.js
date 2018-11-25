import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './index.css';
import App from './App';
import Main from './components/Main';
import SummaryPage from './components/SummaryPage';
import AboutUsPage from './components/AboutUsPage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import CreateSummariesPage from "./components/CreateSummariesPage";
import UserPage from "./components/UserPage";
import NotFoundPage from "./components/NotFoundPage";
import AdminPage from "./components/AdminPage";
import SinglePost from "./components/SinglePost";

ReactDOM.render(
    <BrowserRouter>
        <App>
            <Switch>
                <Route exact path="/" component={Main}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route exact path="/registration" component={RegistrationPage}/>
                <Route exact path="/summary" component={SummaryPage}/>
                <Route exact path="/summary/:id" component={SinglePost}/>
                <Route exact path="/create" component={CreateSummariesPage}/>
                <Route exact path="/about" component={AboutUsPage}/>
                <Route exact path="/account/profile" component={UserPage}/>
                <Route exact path="/admin" component={AdminPage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </App>
    </BrowserRouter>, document.getElementById('root'));