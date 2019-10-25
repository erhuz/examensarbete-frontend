import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import { ReactReduxContext } from 'react-redux';
import { Menu, Dropdown, Label, Image, Icon } from 'semantic-ui-react';



export default class Header extends Component {
  constructor(props){
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
    console.log('HEADER MOUNTED');


    this.userLogin();
  }

  userLogin = () => {
    const userForm = new FormData();
    userForm.append('name', 'John Doe');
    userForm.append('email', 'john.doe@example.com');
    userForm.append('password', 'pass1234');
    userForm.append('password_confirmation', 'pass1234');

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
    })
    .catch(err => {
      console.error('Error Recieved: ' + err);

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
      .then(json => {
        this.props.SET_ACCOUNT_DATA({
          account_name: json.name,
          account_email: json.email,
          account_img: null,
        });
        return true;
      })
      .catch(err => {
        console.error(err);
        return false;
      })
    }
  }

  userLogout = () => {
    this.props.REMOVE_ACCESS_TOKEN();
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    this.getAndSetUserDataIfAuthenticated();


    const { activeItem } = this.state

    // INLINE STYLES
    const marginTopStyles = {marginTop: 18};
    const floatRightStyles = {float: 'right'};

    const itemsData = [
      { href:'/', title: 'Home' },
      { href:'/support', title: 'Support' },
      { href:'/contact', title: 'Contact' },
    ].map( item => {
      item.slug = item.title.replace(' ', '-').toLowerCase();
      item.key = 'menu-item-' + item.href + '-' + item.slug;
      return item
    });

    const menuItems = itemsData.map(item => (
      <Menu.Item
        as={Link}
        to={item.href}
        key={item.key}
        name={item.slug}
        active={activeItem === item.slug}
        onClick={this.handleItemClick}
        content={item.title}
      />
    ));

    const CustomerLabel = (<Label style={floatRightStyles} color='teal'>Customer</Label>);
    const EmployeeLabel = (<Label style={floatRightStyles} color='green'>Employee</Label>);

    const ActiveLabel = () => {
      if(this.props.account_role === 'Employee'){
        return EmployeeLabel
      }else{
        return CustomerLabel
      }
    }


    const testEl = () => {
      const { access_token } = this.props;

        let profileOrLoginButton = (
          <Menu.Item
            position='right'
            name='login'
            active={activeItem === 'login'}
            onClick={this.userLogin}
            content='Log In'
          />
        )

        if(access_token !== null){
          profileOrLoginButton = (
            <Dropdown
              as={Menu.Item}
              position='right'
              text={this.props.account_name}
              item
              simple
            >
              <Dropdown.Menu>
                <Dropdown.Item>
                  <div>
                    <Image src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=120&q=80' avatar />
                    {CustomerLabel}
                  </div>
                  <div style={marginTopStyles}>
                    <span>{this.props.account_email}</span>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item>Account <Icon name='user' style={floatRightStyles} /></Dropdown.Item>
                <Dropdown.Item onClick={this.userLogout}>Log Out <Icon name='log out' style={floatRightStyles} /></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )
        }


        return(
            <>
              { menuItems }
              { profileOrLoginButton }
            </>
        );
    }

    // Move logic out of render function with the help of this.props
    return (
      <Menu>
        {testEl()}
      </Menu>
    )
  }
}
