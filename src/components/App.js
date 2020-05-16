import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import AuthorizedRoute from './AuthorizedRoute';
import HomePage from './pages/home/HomePage';
import AppLayout from './layout/AppLayout';
import { useDispatch } from 'react-redux';
import {actions} from '../redux';

function App() {
    const dispatch = useDispatch();
    dispatch(actions.location.checkLocation({}));

    return (
        <HashRouter>
            <AppLayout>
                <Switch>
                    <AuthorizedRoute exact path="/">
                        <HomePage />
                    </AuthorizedRoute>
                    <AuthorizedRoute exact path="/kek">
                        Kek
                    </AuthorizedRoute>
                    {/*<AuthorizedRoute exact path="/article/:articleId">
                        <ArticlePage />
                    </AuthorizedRoute>
                    <AuthorizedRoute exact path="/author/:authorId">
                        <AuthorPage />
                    </AuthorizedRoute>
                    <Route exact path="/signin">
                        <SignInPage />
                    </Route>
                    <Route exact path="/signup">
                        <SignUpPage />
                    </Route>*/}
                    <Route>
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </AppLayout>
        </HashRouter>
    );
}

export default App;
