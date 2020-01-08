import React from 'react';
import PropTypes from 'prop-types';
import { Route } from "react-router-dom";
import HomePage from './components/pages/HomePage';
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";
import SignupPage from "./components/pages/SignupPage.1";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import CharactersPage from "./components/pages/CharactersPage";
import NewBookPage from "./components/pages/NewBookPage";
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';
import TopNavigation from './components/navigation/TopNavigation';
import Loader from "react-loader";
import { IntlProvider } from "react-intl";

import { fetchCurrentUser } from './actions/users';

import { connect } from "react-redux";
import messages from './messages';

class App extends React.Component {
    componentDidMount() {
        if (this.props.isAuthenticated && !this.props.loaded) this.props.fetchCurrentUser();
    }

    render() {
        console.log('props');
        console.log(this.props)
        const { location, isAuthenticated, loaded, lang } = this.props;
        return (
            <IntlProvider locale={lang} messages={messages[lang]}>
                <div>
                    <Loader loaded={loaded}>
                        {isAuthenticated && <TopNavigation />}
                        <div className="ui container">

                            <Route location={location} path="/" exact component={HomePage} />
                            <Route location={location} path="/confirmation/:token" exact component={ConfirmationPage} />
                            <GuestRoute location={location} path="/login" exact component={LoginPage} />
                            <GuestRoute location={location} path="/signup" exact component={SignupPage} />
                            <GuestRoute location={location} path="/forgot-password" exact component={ForgotPasswordPage} />
                            <GuestRoute location={location} path="/reset-password/:token" exact component={ResetPasswordPage} />
                            <UserRoute location={location} path="/dashboard" exact component={DashboardPage} />
                            <UserRoute location={location} path="/books/new" exact component={NewBookPage} />
                            <UserRoute location={location} path="/caracters" exact component={CharactersPage} />
                        </div>
                    </Loader>
                </div>
            </IntlProvider>

        )
    }
}
App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }),
    isAuthenticated: PropTypes.bool.isRequired,
    fetchCurrentUser: PropTypes.func.isRequired,
    loaded: PropTypes.bool.isRequired,
    lang: PropTypes.string.isRequired
};

function mapStateToProps(state) {
    console.log(state.user);
    return {
        isAuthenticated: !!state.user.email,
        loaded: state.user.loaded,
        lang: state.locale.lang
    }
}

export default connect(mapStateToProps, { fetchCurrentUser })(App);
