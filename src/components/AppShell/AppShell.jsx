import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { compose } from 'recompose';
import {
    Route,
    Switch,
    withRouter,
} from 'react-router-dom';

import {
    asyncLoginGuestUser,
    logoutUser,
} from '../../store/Login/login-actions';
import Navbar from './Navbar/NavBar';

import SearchScreen from '../screens/SearchScreen/SearchScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';

import './AppShell.css';

class AppShell extends Component {
    constructor(props) {
        super(props);

        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    componentDidMount() {
        this.props.asyncLoginGuestUser();
    }

    onLogoutClick() {
        this.props.logoutUser();
    }

    render() {
        const {
            user,
            userIsGuest,
        } = this.props;

        return (
            <div className="app-shell">
                <Navbar
                    user={user}
                    isGuest={userIsGuest}
                    onLogoutClick={this.onLogoutClick}
                />
                <Switch>
                    <Route exact path="/" component={SearchScreen} />
                    <Route exact path="/restaurant/:id" component={SearchScreen} />
                    <Route exact path="/login" component={LoginScreen} />
                </Switch>
            </div>
        );
    }
}

AppShell.defaultProps = {
    asyncLoginGuestUser: null,
    logoutUser: null,
    user: null,
    userIsGuest: true,
};

AppShell.propTypes = {
    asyncLoginGuestUser: PropTypes.func,
    logoutUser: PropTypes.func,
    user: PropTypes.shape({
        id: PropTypes.string,
    }),
    userIsGuest: PropTypes.bool,
};

const mapStateToProps = ({ login: { user, userIsGuest } }) => ({
    user,
    userIsGuest,
});

export default compose(
    withRouter,
    connect(mapStateToProps, {
        asyncLoginGuestUser,
        logoutUser,
    }),
)(AppShell);
