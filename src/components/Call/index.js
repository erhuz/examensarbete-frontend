import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class Call extends Component {

  constructor(props){
    super(props);

    this.state = {};
  }

  requestCall = () => {
    const { access_token } = this.props.authReducer;
    console.log('Requested call');

    fetch(process.env.REACT_APP_BACKEND_REST_API + '/call/request', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
    })
    .catch(error => {
      console.error(error);
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.requestCall}> Request A Call </Button>
      </div>
    );
  }
}

export default Call;
