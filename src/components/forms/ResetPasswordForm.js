import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from "semantic-ui-react";
import InlineError from '../messages/InlineError';

class SignupForm extends Component {

    state = {
        data: {
            token: this.props.token,
            password: '',
            confirmPassword: ''
        },
        loading: false,
        errors: {}
    }

    onChange = e => this.setState({
        data: { ...this.state.data, [e.target.name]: e.target.value }
    })

    onSubmit = () => {
        const errors = this.validate(this.state.data);
        this.setState({ errors });

        if (Object.keys(errors).length === 0) {
            this.setState({ loading: true });
            console.log(this.state.data);
            this.props.submit(this.state.data).catch(err => {
                errors.global = err.response.data[0].message;
                this.setState({ errors, loading: false });
            });
            console.log(errors);


        }
    }

    validate = (data) => {
        const errors = {};

        if (!data.password) errors.password = "Não pode ser vazio";
        if (data.password !== data.confirmPassword) {
            errors.password = "Passwords must match";
            errors.confirmPassword = errors.password;
        }

        return errors;
    }

    render() {
        const { data, errors, loading } = this.state;
        return (

            <Form onSubmit={this.onSubmit} loading={loading}>
                {errors.global && <Message negative>
                    <Message.Header>Algo deu errado!</Message.Header>
                    <p>{errors.global}</p>
                </Message>}
                <Form.Field error={!!errors.password}>
                    <label htmlFor='password' >New Password</label>
                    <input type='password' id='password' name='password' placeholder='insira sua senha'
                        value={data.password}
                        onChange={this.onChange}
                    />
                    {errors.password && <InlineError text={errors.password} />}
                </Form.Field>
                <Form.Field error={!!errors.confirmPassword}>
                    <label htmlFor='confirmPassword' >Confirm new Password</label>
                    <input type='password' id='confirmPassword' name='confirmPassword' placeholder='insira sua senha novamente'
                        value={data.confirmPassword}
                        onChange={this.onChange}
                    />
                    {errors.confirmPassword && <InlineError text={errors.confirmPassword} />}
                </Form.Field>
                <Button primary >Reset</Button>
            </Form>
        )
    }
}

SignupForm.propTypes = {
    submit: PropTypes.func.isRequired,
    token: PropTypes.string,
}

export default SignupForm;
