import React, { Component } from 'react'
import { Form, Segment } from 'semantic-ui-react'

export default class LoginForm extends Component {
  state = { name: '', email: '' }


  userLogin = (email, password) => {
    const userForm = new FormData();
    userForm.append('email', email);
    userForm.append('password', password);

    fetch(process.env.REACT_APP_BACKEND_REST_API + '/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        ContentType: 'multipart/form-data',
      },
      body: userForm,
    })
    .then(res => res.json())
    .then(json => {
      this.props.SET_ACCESS_TOKEN(json.token);

      this.getAndSetUserDataIfAuthenticated();
    })
    .catch(error => {
      console.error(error);

    })
  }

  getAndSetUserDataIfAuthenticated = () => {
    const { access_token } = this.props;

    if(access_token !== null){
      fetch(process.env.REACT_APP_BACKEND_REST_API + '/user', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${access_token}`,
        }
      })
      .then(res => res.json())
      .then(user => {
        this.props.SET_USER_DATA(user);
      })
      .catch(error => {
        console.error(error);
      })
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    const {email, password} = this.state;

    this.userLogin(email, password);
    console.log('submitted with data:');
    console.log({email, password});
  }

  render() {
    // const { email, password } = this.state;

    if(this.props.user.name !== null){
      return (
        <Segment>
          <h3>You are now logged in!</h3>
        </Segment>
      );
    }

    return (
      <Segment>
        <h3> Login </h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths='equal'>
            <Form.Input
              fluid
              id='form-subcomponent-shorthand-input-email'
              name='email'
              label='Email'
              placeholder='First name'
              onChange={this.handleChange}
            />
            <Form.Input
              fluid
              id='form-subcomponent-shorthand-input-password'
              name='password'
              label='Password'
              type='password'
              placeholder='********'
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Button content='Submit' />
        </Form>
      </Segment>
    );
  }

}
