import React, { Component } from 'react';
import { Message } from "semantic-ui-react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { resetPasswordRequest } from '../../actions/auth';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';

class ForgotPasswordPage extends Component {
    state = {
        success: false
    }

    submit = email => this.props.resetPasswordRequest(email)
        .then(() => this.setState({ success: true }));

    render() {
        return (
            <div>
                {this.state.success ?
                    <Message>Email has been sent.</Message> :
                    <ForgotPasswordForm submit={this.submit} />
                }
            </div>
        );
    }
}

ForgotPasswordPage.propTypes = {
    resetPasswordRequest: PropTypes.func.isRequired
}

export default connect(null, { resetPasswordRequest })(ForgotPasswordPage);