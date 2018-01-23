import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { createLink, fetchLinks } from 'actions';
import { ROOT_URL, URL_REGEX } from '../constants';

import Links from './Links';

class Home extends Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){
        this.props.fetchLinks();
    }

    renderField(field){
        const { meta: { touched, error } } = field;
        const activeClassName = error ? "disabled" : null;

        return(
            <div className="input-group">
                <input
                    className="form-input input-shorten"
                    type="text"
                    placeholder={ field.placeholder }
                    { ...field.input }
                />
                <button className={`btn-shorten btn input-group-btn ${activeClassName}`}><span>Shorten URL</span></button>
            </div>
        );
    }

    onSubmit(values){
        const randomPath = Math.random().toString(36).substr(2, 6).toUpperCase();
        const targetURL = `cyonder.me/${randomPath}`;

        // Remove protocol if exist
        values.original_url = values.original_url.replace(/(^\w+:|^)\/\//, '');
        values.short_url = targetURL; // Add targetURL to values object.
        values.path = randomPath;

        // console.log("values: ", values);

        this.props.createLink(values, () => {
            this.props.reset();
            this.props.fetchLinks();
        });
    }

    renderForm(){
        const { handleSubmit } = this.props;

        return(
            <form onSubmit={ handleSubmit(this.onSubmit) }>
                <Field
                    name="original_url"
                    placeholder="Your original URL here"
                    component={ this.renderField }
                />
                <p className="form-input-hint">All cyonder.me URLs are public and can be accessed by anyone</p>
            </form>
        );
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
                <Links links={this.props.links} />
                <footer>
                    <span className="footer-text">Currently you cannot delete any links. Cookie session will be implemented very soon!</span>
                </footer>
            </div>
        )
    };
};

const validate = values => {
    const errors = {};

    if(!values.original_url){
        errors.original_url = "Required!";
    }
    // else if(!URL_REGEX.test(values.original_url)){
    //     errors.original_url = "Invalid URL";
    // }

    return errors
}

const mapStateToProps = (state) => {
    return {
        links: state.links
    }
};

export default reduxForm({
    form: 'url',
    validate,
})(
    connect(mapStateToProps, { createLink, fetchLinks })(Home)
);
