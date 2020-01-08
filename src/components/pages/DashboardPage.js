import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ConfirmEmailMessage from '../messages/ConfirmEmailMessage';
import { allBooksSelector } from '../../reducers/books';
import AddBookCta from '../ctas/AddBookCta';


const DashboardPage = ({ isConfirmed, books }) => (
    <div>
        {!isConfirmed && <ConfirmEmailMessage />}
        {books.length === 0 && <AddBookCta />}
    </div>
)

const mapStateToProps = (state) => ({
    isConfirmed: !!state.user.confirmed,
    books: allBooksSelector(state)
})


DashboardPage.propTypes = {
    isConfirmed: PropTypes.bool.isRequired,
    books: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired
    }).isRequired
    ).isRequired
}

export default connect(mapStateToProps)(DashboardPage)
