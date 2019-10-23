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
