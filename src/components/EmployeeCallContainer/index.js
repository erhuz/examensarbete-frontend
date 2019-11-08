import React, { Component } from 'react';
import { createSession, OTPublisher, OTSubscriber } from 'opentok-react';
import { Button } from 'semantic-ui-react';
import Call from 'components/Call';

class EmployeeCallContainer extends Component {

  constructor(props){
    super(props);

    this.state = {};
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
