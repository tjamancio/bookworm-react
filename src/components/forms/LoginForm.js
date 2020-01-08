import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Message } from "semantic-ui-react";
import Validator from 'validator';
import InlineError from '../messages/InlineError';

class LoginForm extends Component {

    state = {
        data: {
            email: '',
            password: ''
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
            this.setState({ loading: true })
            this.props.submit(this.state.data).catch(err => {
                errors.global = err.response.data[0].message;
                this.setState({ errors, loading: false });
            });
            console.log(errors);


        }
    }

    validate = (data) => {
        const errors = {};
        if (!Validator.isEmail(data.email)) errors.email = "Email inválido"
        if (!data.password) errors.password = "Não pode ser vazio";

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
                <Form.Field error={!!errors.email}>
                    <label htmlFor='email' >Email</label>
                    <input type='email' id='email' name='email' placeholder='insira seu email'
                        value={data.email}
                        onChange={this.onChange}
                    />
                    {errors.email && <InlineError text={errors.email} />}
                </Form.Field>
                <Form.Field error={!!errors.password}>
                    <label htmlFor='password' >password</label>
                    <input type='password' id='password' name='password' placeholder='insira sua senha'
                        value={data.password}
                        onChange={this.onChange}
                    />
                    {errors.password && <InlineError text={errors.password} />}
                </Form.Field>
                <Button primary >Login</Button>
            </Form>
        )
    }
}

LoginForm.propTypes = {
    submit: PropTypes.func.isRequired
}

export default LoginForm;
