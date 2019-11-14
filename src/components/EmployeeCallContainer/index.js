import React, { Component } from 'react';
import { createSession, OTPublisher, OTSubscriber } from 'opentok-react';
import { Button } from 'semantic-ui-react';
import Call from 'components/Call';

class EmployeeCallContainer extends Component {

  constructor(props){
    super(props);

    this.state = {};
  }

  HangUp = () => {

    fetch(process.env.REACT_APP_BACKEND_REST_API + '/call/end/' + this.props.callReducer.call.id, {
      headers: {
        Authorization: 'Bearer ' + this.props.authReducer.access_token,
        Accept: 'application/json',
      },
    })
    .then(res => res.json())
    .then(json => {
      this.props.REMOVE_CURRENT_CALL();
    })
    .catch(err => {console.error(err);})

  }

  render() {

    if(this.props.callReducer.call !== null){
      return (
        <div>
          <Call
            apiKey={process.env.REACT_APP_OPENTOK_KEY}
            sessionId={this.props.callReducer.call.session_id}
            sessionToken={this.props.callReducer.call.recipient_token}
          />
          <Button onClick={this.HangUp}>Hang Up</Button>
        </div>
      );
    }

    return (
      <div>
        Waiting for a call...
      </div>
    );
  }
}

export default EmployeeCallContainer;
