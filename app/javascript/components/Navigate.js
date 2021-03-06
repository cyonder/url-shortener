import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchLinks } from '../actions';

class Navigate extends Component{
    componentDidMount(){
        this.props.fetchLinks();
    }

    componentWillReceiveProps(nextProps){
        const path = this.props.match.params.path;

        if(this.props.links != nextProps.links){
            let nextLinks = nextProps.links;

            let link = Object.keys(nextLinks)
                        .filter(key => nextLinks[key].path === path)
                        .map(key => nextLinks[key])[0];

            window.location.href = `https://${link.original_url}`;
        }
    }

    render(){
        return true;
    }

}

const mapStateToProps = (state) => {
    return {
        links: state.links
    }
}

export default connect(mapStateToProps, { fetchLinks })(Navigate);
