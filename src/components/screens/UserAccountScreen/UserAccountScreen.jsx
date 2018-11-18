import React, { Component } from 'react';
import {
    Heading,
    Box,
    Tabs,
    Tab,
} from 'grommet';
import { UserFemale } from 'grommet-icons';

class UserAccountScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        return (
            <Box>
                <Heading
                    size="large"
                    alignSelf="center"
                >
                    Rojin
                </Heading>
                <Box
                    alignSelf="center"
                    background={{ color: '#f7f7f7' }}
                    pad="large"
                    round="50%"
                    width="200px"
                    height="200px"
                    align="center"
                    justify="center"
                >
                    <UserFemale size="xlarge" />
                </Box>
                <Heading
                    size="medium"
                    alignSelf="center"
                >
                    rojb
                </Heading>
                <Box
                    basis="full"
                    margin={{ top: 'auto' }}
                >
                    <Tabs>
                        <Tab title="Tab 1">
                            <Box margin="small" pad="large" align="center" background="accent-1">
                                <Heading>Hey</Heading>
                            </Box>
                        </Tab>
                        <Tab title="Tab 2">
                            <Box margin="small" pad="large" align="center" background="accent-2">
                                <Heading>Hey</Heading>
                            </Box>
                        </Tab>
                        <Tab title="Tab 3">
                            <Box margin="small" pad="large" align="center" background="accent-3">
                                <Heading>Hey</Heading>
                            </Box>
                        </Tab>
                    </Tabs>
                </Box>
            </Box>
        );
    }
}

export default UserAccountScreen;
