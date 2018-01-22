import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import { createLink } from 'actions';
import { ROOT_URL } from '../constants';

class Home extends Component {
    constructor(props){
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    }

    renderTextField(field){
        return(
            <div className="input-group">
                <input
                    className="form-input input-lg"
                    type="text"
                    placeholder={ field.placeholder }
                    { ...field.input }/>
                <button className="btn input-group-btn btn-lg">Shorten URL</button>
            </div>
        );
    }

    onSubmit(values){
        const randomURL = Math.random().toString(36).substr(2, 6).toUpperCase();
        const targetURL = `${ROOT_URL}/${randomURL}`;

        values.short_url = targetURL; // Add targetURL to values object.

        this.props.createLink(values);
    }

    renderForm(){
        const { handleSubmit } = this.props;

        console.log("home-props: ", this.props);

        return(
            <div className="form-wrapper">
                <form onSubmit={ handleSubmit(this.onSubmit) }>
                    <Field
                        name="original_url"
                        placeholder="Your original URL here"
                        component={ this.renderTextField }
                    />
                </form>
            </div>
        );
    }

    render(){
        return(
            <div id="app">
                { this.renderForm() }
            </div>
        )
    };
};

export default reduxForm({
    form: 'url'
})(
    connect(null, { createLink })(Home)
);
