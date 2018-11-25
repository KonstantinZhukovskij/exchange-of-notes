import React from 'react';
import Popular from '../Popular';
import Footer from '../Contacts';
import About from '../About';
import SideBarPost from '../SideBarPost';

export default class SideBar extends React.Component {
    render() {
        return (
            <section className="leftBar">
                <Popular/>
                <div>
                    {this.props.object.sort((a, b) => b.likes.length - a.likes.length).map((summary, i) =>
                        <SideBarPost id={summary.id}
                                     firstName={summary.User.firstName}
                                     lastName={summary.User.lastName}
                                     title={summary.title}
                                     createdAt={summary.createdAt}
                                     likes={summary.likes.length}
                                     key={i}
                        />)
                    }
                </div>
                <About/>
                <Footer/>
            </section>
        );
    }
}