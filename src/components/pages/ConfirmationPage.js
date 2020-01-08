import React, { Component } from 'react'
import { Message, Icon, MessageContent } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { confirm } from '../../actions/auth';
import { connect } from "react-redux";

class ConfirmationPage extends Component {

    state = {
        loading: true,
        success: false
    }

    componentDidMount() {
        this.props.confirm(this.props.match.params.token)
            .then(() => this.setState({ loading: false, success: true }))
            .catch(() => this.setState({ loading: false, success: false }));
    }

    render() {
        const { loading, success } = this.state;
        return (
            <div>
                {loading && (
                    <Message icon>
                        <Icon name='circle notched' loading />
                        <Message.Header>Validating your email</Message.Header>
                    </Message>
                )}
                {!loading && success && (
                    <Message success icon>
                        <Icon name='checkmark' />
                        <MessageContent>
                            <Message.Header>Tank you. Your accoutn has been verified</Message.Header>
                            <Link to='/dashboard'>Go to your dashboard</Link>
                        </MessageContent>
                    </Message>
                )}

                {!loading && !success && (
                    <Message negative icon>
                        <Icon name='warning sign' />

                        <Message.Header>Ooops. Invalid token it seems.</Message.Header>


                    </Message>
                )}
            </div>
        )
    }
}

ConfirmationPage.propTypes = {
    confirm: PropTypes.func.isRequired,
    match: PropTypes.shape({
        params: PropTypes.shape({
            token: PropTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default connect(null, { confirm })(ConfirmationPage)
