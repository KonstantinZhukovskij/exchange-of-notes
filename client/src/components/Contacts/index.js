import React from 'react';

export default class Contacts extends React.Component {
    render() {
        return (
            <section id="footer" className="leftBar">
                <p>Присоединяйся к нашему сообществу</p>
                <ul className="icons">
                    <li>
                        <a href="https://github.com"
                           className="fa-github fa-2x"
                           target="_blank"
                           rel="noopener noreferrer"><span className="label">GitHub</span></a>
                    </li>

                    <li>
                        <a href="https://www.facebook.com"
                           className="fa-facebook fa-2x"
                           target="_blank"
                           rel="noopener noreferrer"><span className="label">Facebook</span></a>
                    </li>

                    <li>
                        <a href="https://twitter.com"
                           className="fa-twitter fa-2x"
                           target="_blank"
                           rel="noopener noreferrer"><span className="label">Twitter</span></a>
                    </li>

                    <li>
                        <a href="https://www.linkedin.com"
                           className="fa-linkedin fa-2x"
                           target="_blank"
                           rel="noopener noreferrer"><span className="label">LinkedIn</span></a>
                    </li>
                </ul>
            </section>
        );
    }
}