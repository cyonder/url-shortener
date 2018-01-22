import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { createLink, fetchLinks } from 'actions';
import { ROOT_URL } from '../constants';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            links: [],
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        this.props.fetchLinks(links => {
            this.setState({ links })
        });
    }

    renderTextField(field){
        return(
            <div className="input-group">
                <input
                    className="form-input input-lg"
                    type="text"
                    placeholder={ field.placeholder }
                    { ...field.input }/>
                <button className="btn input-group-btn btn-lg btn-shorten">Shorten URL</button>
            </div>
        );
    }

    onSubmit(values){
        const randomPath = Math.random().toString(36).substr(2, 6).toUpperCase();
        const targetURL = `${ROOT_URL}/${randomPath}`;

        values.short_url = targetURL; // Add targetURL to values object.
        values.path = randomPath;

        this.props.createLink(values, () => {
            // this.props.history.push('/');
            // window.location = `http://${original_url}`;
        });
    }

    renderForm(){
        const { handleSubmit } = this.props;

        console.log("home-props: ", this.props);

        return(
            <form onSubmit={ handleSubmit(this.onSubmit) }>
                <Field
                    name="original_url"
                    placeholder="Your original URL here"
                    component={ this.renderTextField }
                />
                 <p className="form-input-hint">All cyonder.me URLs are public and can be accessed by anyone</p>
            </form>
        );
    }

    renderLinks(){
        console.log("state-Links: ", this.state.links);
        const links = this.state.links;

        return links.map( (link, index) => {
            return(
                <tr className="link" key={index}>
                    <td>{link.original_url}</td>
                    <td>{link.short_url}</td>
                    <td>5 Hours Ago</td>
                </tr>
            )
        })
    }

    render(){
        return(
            <div id="app">
                <header className="header">
                    <div className="header-wrapper">
                        <div className="h2 headline">Shorten your links</div>
                        <div className="form-wrapper">
                            { this.renderForm() }
                        </div>
                    </div>
                </header>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Original URL</th>
                            <th>Short URL</th>
                            <th>Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderLinks() }
                    </tbody>
                </table>
            </div>
        )
    };
};

export default reduxForm({
    form: 'url'
})(
    connect(null, { createLink, fetchLinks })(Home)
);
