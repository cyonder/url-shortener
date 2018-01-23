import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

class Links extends Component{
    renderLinks(){
        let links = this.props.links;

        if(Object.keys(links).length > 0){

        }

        return Object.keys(links)
                    .sort((a,b) => b - a)
                    .map((key, index) => {
                        const date = moment(links[key].created_at).fromNow();

                        return(
                            <tr className="link" key={index}>
                                <td className="col-a">
                                    <a href={`http://${links[key].original_url}`}>{links[key].original_url}</a>
                                </td>
                                <td className="col-b">
                                    <Link to={`${links[key].path}`}>{links[key].short_url}</Link>
                                </td>
                                <td className="col-c">{date}</td>
                            </tr>
                        )
                    })
    }

    render(){
        return(
            <main>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Original URL</th>
                            <th>Short URL</th>
                            <th className="text-right">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderLinks() }
                    </tbody>
                </table>
            </main>
        )
    }
}

export default Links;
