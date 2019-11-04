import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { ReactReduxContext } from 'react-redux';
import { Container } from 'semantic-ui-react';

import Header from 'containers/header.container';
import Footer from 'partials/Footer';

import Index from 'pages/Index';
import Support from 'pages/Support';
import Contact from 'pages/Contact';
import Dashboard from 'pages/Dashboard';
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
            <Switch>
              {/* //TODO: Extract all routes into separate Routes Folder or File */}
              <Route exact path='/' component={Index} />
              <Route path='/contact' component={Contact} />

              {/* Authenticated Routes */}
              <ReactReduxContext.Consumer>
                {({store}) => {

                  const { user } = store.getState().authReducer;
                  const NoRouteFound = <Route component={NotFound} />
                  let OptionalRoutes;

                  // I dont know why, but it does what i want
                  // Found out by accident
                  if(user.roles !== null){
                    const SupportRoute = <Route key='support' path='/support' component={Support} />;
                    const DashboardRoute = <Route key='dashboard' path='/dashboard' component={Dashboard} />;

                    OptionalRoutes = user.roles.map(role => {
                      switch (role.name) {
                        case 'employee':
                          return DashboardRoute;

                        case 'customer':
                          return SupportRoute;

                        default:
                          return SupportRoute;
                      }
                    })

                  }else{
                    OptionalRoutes = NoRouteFound;
                  }

                  return (
                    <>
                      { OptionalRoutes }
                    </>
                  )
                }}
              </ReactReduxContext.Consumer>
            </Switch>
          <Footer/>
        </Router>
      </Container>
    );
  }
}


export default App;
