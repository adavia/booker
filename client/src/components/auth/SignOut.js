import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

class SignOut extends Component {
  componentDidMount = () => {
   this.props.authStore.signout();
  }

  render() {
    return <Redirect to="/auth/signin" />;
  }
}

export default inject('authStore')(observer(SignOut));
