import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { charactersSelector } from '../../reducers/characters';

const CharactersPage = (characters) => {
    console.log(characters);
    return (
        <div>

        </div>
    )
}

CharactersPage.propTypes = {
    characters: PropTypes.arrayOf(PropTypes.object).isRequired,
}

function mapStateToProps(state) {
    return {
        characters: charactersSelector(state)
    }
}

export default connect(mapStateToProps)(CharactersPage)
