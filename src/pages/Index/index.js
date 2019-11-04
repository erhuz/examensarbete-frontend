import React from 'react';
import Layout from 'layouts/Default';
import LoginForm from 'containers/login.container';

function Index() {
  return (
    <Layout>
      Home
      <LoginForm/>
    </Layout>
  );
}

export default Index;
