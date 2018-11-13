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

import { asyncLoginUser } from '../../../store/Login/login-actions';

import './LoginScreen.css';

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            confirmedPassword: '',
            isSignUp: false,
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onLoginSubmit = this.onLoginSubmit.bind(this);
        this.toggleSignup = this.toggleSignup.bind(this);
    }

    onUsernameChange(username) {
        this.setState(prevState => ({
            ...prevState,
            username,
        }));
    }

    onPasswordChange(password) {
        this.setState(prevState => ({
            ...prevState,
            password,
        }));
    }

    onLoginSubmit() {
        const { username, password } = this.state;

        this.props.asyncLoginUser({ username, password }, this.props.history);
    }

    toggleSignup() {
        this.setState(prevState => ({
            ...prevState,
            isSignUp: true,
        }));
    }

    render() {
        const {
            username,
            password,
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
                        Login
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
                            onChange={this.onUsernameChange}
                            onSelect={this.onSelect}
                        />
                    </FormField>
                    <FormField
                        label="Password"
                        htmlFor="password"
                        margin={{ bottom: `${this.state.isSignUp ? 'medium' : 'large'}` }}
                        {...this.props}
                    >
                        <TextInput
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={this.onPasswordChange}
                            onSelect={this.onSelect}
                            type="password"
                        />
                    </FormField>
                    <CSSTransition
                        in={this.state.isSignUp}
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
                                value={password}
                                onChange={this.onPasswordChange}
                                onSelect={this.onSelect}
                                type="password"
                            />
                        </FormField>
                    </CSSTransition>
                    <Button
                        margin={{ bottom: 'small' }}
                        primary
                        type="submit"
                        onClick={this.onLoginSubmit}
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
                                    <Text>Login</Text>
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
    loggingIn: PropTypes.bool,
};

const mapStateToProps = ({ login: { loggingIn, user } }) => ({
    loggingIn,
    user,
});

export default connect(mapStateToProps, { asyncLoginUser })(LoginScreen);
