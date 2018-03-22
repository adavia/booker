import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';
import { Layout, Icon } from 'antd';

const { Content } = Layout;

export default function(ComposedComponent) {
  class Authentication extends Component {
    state = {
      loading: false
    }

    componentWillMount = async () => {
      const { authStore } = this.props;

      if (!authStore.authenticated) {
        this.setState({ loading: true });
        await authStore.setAuthenticated();
        this.setState({ loading: false });
      }
    }

    render() {
      const { authStore } = this.props;
      const { loading } = this.state;

      if (loading) {
        return (
          <Layout>
            <Content className="content">
              <div className="center">
                <Icon type="loading" style={{ fontSize: 70 }} spin />
              </div>
            </Content>
          </Layout>
        );
      }
      
      if (authStore.authenticated) {
        return <ComposedComponent {...this.props} />;
      } else {
        return <Redirect to="/auth/signin" />;
      }
    }
  }

  return inject('authStore')(observer(Authentication));
}
