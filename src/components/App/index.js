import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { ReactReduxContext } from 'react-redux';
import { Container } from 'semantic-ui-react';

import Header from 'containers/auth.container';
import Footer from 'partials/Footer';

import Index from 'pages/Index';
import Support from 'pages/Support';
import Contact from 'pages/Contact';
import NotFound from 'pages/NotFound';


class App extends Component {
  constructor (props){
    super(props);

    this.state = {};
  }

  render() {

    const appContainerStyles = {
      marginTop: 24,
    }

    return (
      <Container style={appContainerStyles}>
        <Router>
          <Header />
          <ReactReduxContext.Consumer>
            {({store}) => {

              setTimeout( () => {
              const { access_token } = store.getState().authReducer;

                console.log('This is logged from the /api/user');

                if(access_token !== null){
                  fetch(process.env.REACT_APP_BACKEND_REST_API + '/user', {
                    method: 'GET',
                    headers: {
                      Accept: 'application/json',
                      Authorization: `Bearer ${access_token}`,
                    }
                  })
                  .then(res => res.json())
                  .then(json => {console.log(json)})
                  .catch(err => {console.error(err);})
                }
              }, 1000);

            }}
          </ReactReduxContext.Consumer>
            <Switch>
              <Route exact path='/' component={Index} />
              <Route path='/support' component={Support} />
              <Route path='/contact' component={Contact} />
              <Route component={NotFound} />
            </Switch>
          <Footer/>
        </Router>
      </Container>
    );
  }
}


export default App;
