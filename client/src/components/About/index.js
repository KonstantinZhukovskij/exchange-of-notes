import React from 'react';
import {Link} from 'react-router-dom';

export default class About extends React.Component {
    render() {
        return (
            <section className="leftBar" id="aboutUs">
                <p>Информация о нашем ресурсе</p>
                <ul className="actions">
                    <li id="aboutButton">
                        <Link to="/about" className="button fas fa-user-friends">Узнать больше</Link>
                    </li>
                </ul>
            </section>
        );
    }
}