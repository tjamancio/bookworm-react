import React, { Component } from 'react'
import { Form, Message, Button } from 'semantic-ui-react';
import Validator from 'validator';
import InlineError from '../messages/InlineError';

export default class ForgotPasswordForm extends Component {
    state = {
        email: '',
        loading: false,
        errors: {}
    }
    onChange = e => this.setState({
        email: e.target.value
    })

    onSubmit = () => {
        const errors = this.validate(this.state.email);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            this.props.submit(this.state.email)
                .catch(err => {
                    errors.global = "Tente novamente mais tarde!";
                    this.setState({ errors, loading: false });
                })
        }
    }

    validate = email => {
        const errors = {}
        if (!Validator.isEmail(email)) errors.email = "Email inválido"
        return errors;
    }

    render() {
        const { loading, errors, email } = this.state;
        return (
            <Form onSubmit={this.onSubmit} loading={loading}>
                {errors.global && <Message negative>
                    <Message.Header>Ago deu errado!</Message.Header>
                    <p>{errors.global}</p>
                </Message>}
                <Form.Field error={!!errors.email}>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email'
                        value={email} onChange={this.onChange} />
                    {errors.email && <InlineError text={errors.email} />}
                </Form.Field>
                <Button>Send</Button>
            </Form>
        )
    }
}
