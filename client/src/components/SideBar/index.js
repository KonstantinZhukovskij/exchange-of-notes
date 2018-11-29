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
                    {this.props.object.map((popularSummaries, i) =>
                        <SideBarPost id={popularSummaries.id}
                                     firstName={popularSummaries.User.firstName}
                                     lastName={popularSummaries.User.lastName}
                                     title={popularSummaries.title}
                                     createdAt={popularSummaries.createdAt}
                                     likes={popularSummaries.likes}
                                     imageSrc={popularSummaries.imageSrc}
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