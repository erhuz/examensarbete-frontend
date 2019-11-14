import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import Call from 'components/Call';
import echoHelper from 'helpers/echo';


class CustomerCallContainer extends Component {

  constructor(props){
    super(props);

    this.state = {};
  }

  componentWillMount(){
    const {user, access_token} = this.props.authReducer;
    const Echo = echoHelper(access_token);

    Echo.private('App.User.' + user.id)
    .listen('EndCall', (event) => {
      this.props.REMOVE_CURRENT_CALL();
    });
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
    console.log(this.props.callReducer.call !== null);
    console.log(this.props.callReducer.call);

      if(this.props.callReducer.call !== null){
        return (
          <div>
            <Call
              apiKey={process.env.REACT_APP_OPENTOK_KEY}
              sessionId={this.props.callReducer.call.session_id}
              sessionToken={this.props.callReducer.call.caller_token}
            />
          </div>
          );
        }

    return(
      <div>
        <Button onClick={this.requestCall}>Request a Support Call</Button>
      </div>
    );
  }
}

export default CustomerCallContainer;
