import { Component } from 'react';

class Token extends Component {
  // constructor(props) {
  //   super(props);

  //   state: {}
  // }

  componentDidMount(){

    const fakeForm = new FormData();
    // fakeForm.append('name', 'John Doe');
    // fakeForm.append('email', 'john.doe@example.com');
    // fakeForm.append('password', 'pass1234');
    // fakeForm.append('password_confirmation', 'pass1234');

    fetch(process.env.REACT_APP_BACKEND_REST_API + '/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        ContentType: 'multipart/form-data',

      },
      body: fakeForm,
    })
    .then(res => res.json())
    .then(json => {
      this.props.SET_ACCESS_TOKEN(json.token);
    })
    .catch(err => {
      console.error('Error Recieved: ' + err);

    })

    // fetch(process.env.REACT_APP_BACKEND_REST_API + '/login', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //   },
    //   body: formData,
    // })

    // fetch(process.env.REACT_APP_BACKEND_REST_API + '/login', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //   },
    //   body: formData,
    // })
    // .then(res => { console.log(res) })
    // .then(json => {
    //   this.props.SET_ACCESS_TOKEN();
    //   console.log(json);
    //  })
  }

  render() {

    console.log(this.props);

    return null;
  }
}

export default Token;
