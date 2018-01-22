import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchLink } from '../actions';

class Navigate extends Component{
    componentWillMount(){
        const path = this.props.match.params.path;
        this.props.fetchLink(path, original_url => {
            window.location = `http://${original_url}`;
        });
    }

    render(){
        console.log("navigate-props: ", this.props);
    }

}

const mapStateToProps = (state) => {
    return {
        links: state.links
    }
}

export default connect(mapStateToProps, { fetchLink })(Navigate);
