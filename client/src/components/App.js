import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import DefaultLayout from './general/layouts/Default';

import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import SignOut from './auth/SignOut';

import BookList from './books/BookList';
import BookOwnList from './books/BookOwnList';
import BookShow from './books/BookShow';
import BookNew from './books/BookNew';
import BookEdit from './books/BookEdit';

import '../styles/App.less';

class App extends Component {
  previousLocation = this.props.location;

  componentWillUpdate(nextProps) {
    const { location } = this.props;
    const { history } = nextProps;
    if (history.action !== "POP" && (!location.state || !location.state.modal)) {
      this.previousLocation = this.props.location;
    }
  }

  render() {
    const { location } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    );

    return (
      <div>
        <Switch location={isModal ? this.previousLocation : location}>
          <Route exact path="/auth/signin" component={SignIn} />
          <Route exact path="/auth/signup" component={SignUp} />
          <Route exact path="/auth/signout" component={SignOut} />
          <DefaultLayout exact path="/books/new" component={props => (
            <BookList><BookNew {...props} /></BookList>
          )}/>
          <DefaultLayout exact path="/books/:id/edit" component={props => (
            <BookShow><BookEdit {...props} /></BookShow>
          )}/>
          <DefaultLayout exact path="/" component={BookList} />
          <DefaultLayout exact path="/books/own" component={BookOwnList} />
          <DefaultLayout exact path="/books/:id" component={BookShow} />
        </Switch>
        {isModal ? <Route path="/books/new" component={BookNew} /> : null}
        {isModal ? <Route path="/books/:id/edit" component={BookEdit} /> : null}
      </div>
    );
  }
}

export default App;

