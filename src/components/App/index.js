import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ReactReduxContext } from 'react-redux';

import Header from 'partials/Header';
import Footer from 'partials/Footer';

import Index from 'pages/Index';
import About from 'pages/About';
import Contact from 'pages/Contact';

import Token from 'containers/auth.container';

class App extends Component {
  constructor (props){
    super(props);

    this.state = {};
  }

  render() {

    return (
      <Router>
        <Token />
        <ReactReduxContext.Consumer>
          {({store}) => {
            console.log(store);

            setTimeout( () => {
            const { access_token } = store.getState().tokenReducer;

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
        <Header/>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/about" component={About} />
            <Route path="/contact" component={Contact} />
          </Switch>
        <Footer/>
      </Router>
    );
  }
}


export default App;
