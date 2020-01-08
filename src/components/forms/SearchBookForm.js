import React, { Component } from 'react'
import { Form, Dropdown } from 'semantic-ui-react';
import Axios from 'axios';

export default class SearchBookForm extends Component {

    state = {
        query: '',
        loading: false,
        options: [{
            key: 1,
            value: 1,
            text: "first book"
        }, {
            key: 2,
            value: 2,
            text: "second book"
        }],
        books: {}

    }

    onSearchChange = (e, data) => {
        clearTimeout(this.timer);
        this.setState({
            query: data
        });
        this.timer = setTimeout(this.fetchOptions, 1000);

    }

    fetchOptions = () => {
        if (!this.state.query) return;
        this.setState({ loading: true });
        Axios.post('/sessions/teste').then(res => console.log(res));
    }



    render() {
        return (
            <Form>
                <Dropdown
                    search
                    fluid
                    placeholder='Search for a book by title'
                    value={this.state.query}
                    onSearchChange={this.onSearchChange}
                    options={this.state.options}
                    loading={this.state.loading}
                />
            </Form>
        )
    }
}
