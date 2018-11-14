import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import {
    Box,
    Heading,
    FormField,
    TextInput,
    Button,
    Text,
} from 'grommet';

import { asyncLoginUser, asyncSignUpUser } from '../../../store/Login/login-actions';

import './LoginScreen.css';

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            name: '',
            password: '',
            confirmedPassword: '',
            passwordMismatch: false,
            isSignUp: false,
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onConfirmedPasswordChange = this.onConfirmedPasswordChange.bind(this);
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
        this.onSignUpSubmit = this.onSignUpSubmit.bind(this);
        this.toggleSignup = this.toggleSignup.bind(this);
    }

    onUsernameChange(username) {
        this.setState(prevState => ({
            ...prevState,
            username,
        }));
    }

    onNameChange(name) {
        this.setState(prevState => ({
            ...prevState,
            name,
        }));
    }

    onPasswordChange(password) {
        this.setState(prevState => ({
            ...prevState,
            passwordMismatch: false,
            password,
        }));
    }

    onConfirmedPasswordChange(confirmedPassword) {
        this.setState(prevState => ({
            ...prevState,
            passwordMismatch: false,
            confirmedPassword,
        }));
    }

    onLoginSubmit() {
        const { username, password } = this.state;

        this.props.asyncLoginUser({ username, password }, this.props.history);
    }

    onSignUpSubmit() {
        const {
            username,
            password,
            confirmedPassword,
            name,
            owner,
        } = this.state;

        if (password !== confirmedPassword) {
            this.setState(prevState => ({
                ...prevState,
                passwordMismatch: true,
            }));
        } else {
            this.props.asyncSignUpUser({
                username,
                password,
                name,
                owner,
                url: '',
            }, this.props.history);
        }
    }

    toggleSignup() {
        this.setState(prevState => ({
            ...prevState,
            isSignUp: !prevState.isSignUp,
        }));
    }

    render() {
        const {
            username,
            name,
            password,
            passwordMismatch,
            confirmedPassword,
            isSignUp,
        } = this.state;

        const { loggingIn, user } = this.props;

        return (
            <Box
                background={{ color: 'brand' }}
                basis="full"
            >
                <Box
                    round="small"
                    pad={{
                        top: 'medium',
                        bottom: 'medium',
                        left: 'large',
                        right: 'large',
                    }}
                    margin={{ top: 'xlarge', right: 'large', left: 'large' }}
                    direction="column"
                    background={{ color: 'white' }}
                >
                    <Heading
                        level={1}
                        size="small"
                        margin={{ bottom: 'large', top: 'large', left: 'small' }}
                    >
                        {isSignUp ? 'Sign Up' : 'Login'}
                    </Heading>
                    <FormField
                        label="Username"
                        htmlFor="username"
                        margin={{ bottom: 'medium' }}
                        {...this.props}
                    >
                        <TextInput
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={event => this.onUsernameChange(event.target.value)}
                            onSelect={this.onSelect}
                        />
                    </FormField>
                    <CSSTransition
                        in={isSignUp}
                        timeout={300}
                        classNames="confirm-password"
                        mountOnEnter
                        unmountOnExit
                    >
                        <FormField
                            label="Name"
                            htmlFor="name"
                            margin={{ bottom: 'medium' }}
                            {...this.props}
                        >
                            <TextInput
                                id="name"
                                placeholder="Enter your name"
                                value={name}
                                onChange={event => this.onNameChange(event.target.value)}
                                onSelect={this.onSelect}
                            />
                        </FormField>
                    </CSSTransition>
                    <FormField
                        label="Password"
                        htmlFor="password"
                        margin={{ bottom: `${isSignUp ? 'medium' : 'large'}` }}
                        {...this.props}
                    >
                        <TextInput
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={event => this.onPasswordChange(event.target.value)}
                            onSelect={this.onSelect}
                            type="password"
                        />
                    </FormField>
                    <CSSTransition
                        in={isSignUp}
                        timeout={300}
                        classNames="confirm-password"
                        mountOnEnter
                        unmountOnExit
                    >
                        <FormField
                            label="Confirm Password"
                            htmlFor="confirm-password"
                            margin={{ bottom: 'large' }}
                            {...this.props}
                        >
                            <TextInput
                                id="confirm-password"
                                placeholder="Retype your password"
                                value={confirmedPassword}
                                onChange={event => (
                                    this.onConfirmedPasswordChange(event.target.value)
                                )}
                                onSelect={this.onSelect}
                                type="password"
                            />
                        </FormField>
                    </CSSTransition>
                    <CSSTransition
                        in={passwordMismatch}
                        timeout={300}
                        classNames="password-mismatch"
                        mountOnEnter
                        unmountOnExit
                    >
                        <Text
                            size="xsmall"
                            color="status-error"
                            style={{
                                marginTop: '-15px',
                                marginBottom: '8px',
                            }}
                        >
                            Oops, those password don&#39;t match
                        </Text>
                    </CSSTransition>
                    <Button
                        margin={{ bottom: 'small' }}
                        primary
                        type="submit"
                        onClick={isSignUp ? this.onSignUpSubmit : this.onLoginSubmit}
                    >
                        <Box
                            pad="medium"
                            justify="center"
                            align="center"
                            direction="row"
                            height="48px"
                        >
                            {
                                (user && loggingIn === true) ? (
                                    <div className="la-ball-pulse">
                                        <div />
                                        <div />
                                        <div />
                                    </div>
                                ) : (
                                    <Text>{isSignUp ? 'Sign Up' : 'Login'}</Text>
                                )
                            }
                        </Box>
                    </Button>
                    <Box
                        direction="row"
                        justify="center"
                    >
                        <Text size="xsmall">Don&#39;t have an account?</Text>
                        <Button
                            plain
                            style={{ lineHeight: '0' }}
                            margin={{ left: 'xsmall' }}
                            onClick={this.toggleSignup}
                        >
                            <Text
                                size="xsmall"
                                style={{ textDecoration: 'underline' }}
                            >
                                Sign Up
                            </Text>
                        </Button>
                    </Box>
                </Box>
            </Box>
        );
    }
}

LoginScreen.defaultProps = {
    loggingIn: null,
};

LoginScreen.propTypes = {
    asyncLoginUser: PropTypes.func.isRequired,
    asyncSignUpUser: PropTypes.func.isRequired,
    loggingIn: PropTypes.bool,
};

const mapStateToProps = ({ login: { loggingIn, user } }) => ({
    loggingIn,
    user,
});

export default connect(mapStateToProps, {
    asyncLoginUser,
    asyncSignUpUser,
})(LoginScreen);
