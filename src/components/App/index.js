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
            store.subscribe(() => { console.log('SUBSCRIBED!'); });
            console.log(store);

            setTimeout( () => {
              console.log('THIS IS LOGGED FROM THE CONSUMER');
              console.log(store.getState().tokenReducer.access_token);
            }, 2000);

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
