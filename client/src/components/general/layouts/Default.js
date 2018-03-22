import React from 'react';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';

import Authentication from '../../auth/Authentication';
import TopBar from './TopBar';

const { Header, Content } = Layout;

const DefaultLayout = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={matchProps => (
      <Layout>
        <Header>
          <TopBar />
        </Header>
        <Content className="content">
          <Component {...matchProps} />
        </Content>
      </Layout>
    )} />
  )
};

export default Authentication(DefaultLayout);