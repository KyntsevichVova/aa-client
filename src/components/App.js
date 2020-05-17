import React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';
import AppLayout from './layout/AppLayout';
import ArticlesPage from './pages/article/ArticlesPage';
import SignInPage from './pages/signin/SignInPage';
import SignUpPage from './pages/signup/SignUpPage';
import NotificationsPage from './pages/notification/NotificationsPage';
import SubscriptionsPage from './pages/subscriptions/SubscriptionsPage';
import ArticlePage from './pages/article/ArticlePage';
import AuthorPage from './pages/author/AuthorPage';

function App() {
    return (
        <HashRouter>
            <AppLayout>
                <Switch>
                    <Route exact path="/">
                        <ArticlesPage />
                    </Route>
                    <Route exact path="/signin">
                        <SignInPage />
                    </Route>
                    <Route exact path="/signup">
                        <SignUpPage />
                    </Route>
                    <Route exact path="/notifications">
                        <NotificationsPage />
                    </Route>
                    <Route exact path="/subscriptions">
                        <SubscriptionsPage />
                    </Route>
                    <Route exact path="/articles/:articleId">
                        <ArticlePage />
                    </Route>
                    <Route exact path="/authors/:authorId">
                        <AuthorPage />
                    </Route>
                    {/*
                    {/*<Route exact path="/authors">
                        <AuthorsPage />
                    </Route>
                    */}
                    <Route>
                        <Redirect to="/" />
                    </Route>
                </Switch>
            </AppLayout>
        </HashRouter>
    );
}

export default App;
