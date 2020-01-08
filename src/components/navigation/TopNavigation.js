import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Image } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import gravatarUrl from 'gravatar-url';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { setLocale } from "../../actions/locale";


const TopNavigation = ({ user, logout, setLocale }) => {
    return (

        <Menu secondary pointing>
            <Menu.Item as={Link} to='/dashboard'>
                <FormattedMessage id='nav.dashboard' defaultMessage="Dashboard" />
            </Menu.Item>
            <Menu.Item as={Link} to='/caracters'>
                <FormattedMessage id='nav.caracters' defaultMessage="My caracters" />
            </Menu.Item>
            <Menu.Menu position='right'>
                <Dropdown trigger={<Image avatar src={gravatarUrl(user.email)} />}>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                        <Dropdown.Item >
                            <a role='button' onClick={() => setLocale('en')}>EN</a> |
                            <a role='button' onClick={() => setLocale('pt')}>PT</a>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
        </Menu>

    )
}

TopNavigation.propTypes = {
    user: PropTypes.shape({
        email: PropTypes.string.isRequired
    }).isRequired,
    logout: PropTypes.func.isRequired,
    setLocale: PropTypes.func.isRequired,
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { logout, setLocale })(TopNavigation)
