import React from 'react';
import { Route as Routes, Switch } from 'react-router-dom';
import { Layout, Divider } from 'antd';
import Navigation from './Components/Navigation';
const { Header, Content, Footer } = Layout;

export const Router = () => {
  return (
    <div>
      <React.Suspense fallback={<p>Loading</p>}>
        <Layout>
          <Header className='header'>
            <Navigation />
          </Header>
          <Divider type='vertical' />
          <Content style={{ padding: '0 20px' }}>
            <Routes
              path='/'
              exact
              component={React.lazy(() => import('./Pages/Home'))}
            ></Routes>
            <Switch>
              <Routes
                path='/cart'
                component={React.lazy(() => import('./Pages/Cart/index'))}
              ></Routes>
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            B2B foodservice
          </Footer>
        </Layout>
      </React.Suspense>
    </div>
  );
};
