import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import propTypes from 'prop-types';

import Home from './Home';

const Navigate = (props) => {
    console.log("navigate-props: ", props);
    // If props.match.params.path exist in DB,
    // programatically navigate
}

const Root = ({ store }) => {
    return(
        <Provider store={ store }>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" render={
                        () => <Home />
                    }/>
                    <Route path="/:path" render={
                        (props) => <Navigate { ...props } />
                    }/>
                </Switch>
            </BrowserRouter>
        </Provider>
    )
};

Root.propTypes = {
    store: propTypes.object.isRequired
};

export default Root;
