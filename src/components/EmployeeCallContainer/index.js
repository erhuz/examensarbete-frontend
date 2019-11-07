import React, { Component } from 'react';
import { createSession, OTPublisher, OTSubscriber } from 'opentok-react';
import { Button } from 'semantic-ui-react';

class Call extends Component {

  constructor(props){
    super(props);

    this.state = { streams: [] };
  }

  componentWillMount() {
    if(this.props.callReducer.call !== null) {
      this.sessionHelper = createSession({
        apiKey: 'your-api-key',
        sessionId: 'your-session-id',
        token: 'your-session-token',
        onStreamsUpdated: streams => { this.setState({ streams }); }
      });
    }
  }

  componentWillUnmount() {
    this.sessionHelper.disconnect();
  }

  render() {

    console.log(this.props);


    if(this.props.callReducer.call === null){
      return (
        <div>
          Waiting for a call...
        </div>
      );
    }

    return (
      <div>
        <OTPublisher session={this.sessionHelper.session} />

        {this.state.streams.map(stream => {
          return (
            <OTSubscriber
              key={stream.id}
              session={this.sessionHelper.session}
              stream={stream}
            />
          );
        })}
      </div>
    );
  }
}

export default Call;
