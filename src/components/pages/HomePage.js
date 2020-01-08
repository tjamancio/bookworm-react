import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth'

const HomePage = ({ isAutenticated, logout }) => (
    <div>
        <h1>Home Page</h1>
        <p>{isAutenticated}</p>
        {isAutenticated ?
            (<button onClick={logout}>Logout</button>) :
            (<div>
                <Link to="/login">Login</Link> or <Link to="/signup">Cadastre-se</Link>
            </div>)}
    </div>
);



HomePage.propTypes = {
    isAutenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
}


function mapStateToProps(state) {
    return {
        isAutenticated: !!state.user.token,
    }
}

export default connect(mapStateToProps, { logout })(HomePage);