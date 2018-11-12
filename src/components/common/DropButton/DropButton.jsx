import React from 'react';
import { Grommet, DropButton } from 'grommet';

class DropButton extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    onClose() {
        this.setState({ open: false });
        setTimeout(() => this.setState({ open: undefined }), 1);
    };

    render() {
        const { open } = this.state;
        return (
            <Grommet theme={grommet}>
                <DropButton
                    label="Open"
                    open={open}
                    onClose={() => this.setState({ open: undefined })}
                    dropContent={<DropContent onClose={this.onClose} />}
                />
            </Grommet>
        );
    }
}
