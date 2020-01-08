import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Segment } from 'semantic-ui-react';
import SearchBookForm from '../forms/SearchBookForm'

export default class NewBookPage extends Component {
    state = {
        book: null
    }

    render() {
        return (
            <Segment>
                <h1>Add new book to your collection</h1>
                <SearchBookForm />
            </Segment>
        )
    }
}
