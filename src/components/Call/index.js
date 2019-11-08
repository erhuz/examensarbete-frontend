import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { OTPublisher, OTSubscriber, createSession } from 'opentok-react';

class Call extends Component {

  constructor(props){
    super(props);

    this.state = { streams: [] };
  }

  componentWillMount() {
    this.sessionHelper = createSession({
      apiKey: this.props.apiKey,
      sessionId: this.props.sessionId,
      token: this.props.sessionToken,
      onStreamsUpdated: streams => { this.setState({ streams }); }
    });
  }

  componentWillUnmount() {
    this.sessionHelper.disconnect();
  }

  render() {

    return (
      <Segment>
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
      </Segment>
    );
  }
}

export default Call;
