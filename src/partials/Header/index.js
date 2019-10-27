import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import { Menu, Dropdown, Label, Image, Icon } from 'semantic-ui-react';
import { getUserRoles } from 'helpers/user';



export default class Header extends Component {
  constructor(props){
    super(props);

    this.state = {
    }
  }

  componentDidMount() {
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

      this.getAndSetUserDataIfAuthenticated();
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
        this.props.SET_USER_DATA({
          name: json.name,
          email: json.email,
          img: null,
          roles: json.roles,
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
    this.props.REMOVE_USER_DATA();
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    // INLINE STYLES
    const marginTopStyles = { marginTop: 14 };
    const floatRightStyles = { float: 'right' };

    // Create Menu items
    let itemsData = [
      { href:'/', title: 'Home' },
      { href:'/contact', title: 'Contact' },
    ];

    if(this.props.user.roles !== null){
      this.props.user.roles.map(role => {
        switch (role.name) {
          case 'employee':
              itemsData.push({ href:'/dashboard', title: 'Dashboard' })
            break;

          case 'customer':
              itemsData.push({ href:'/support', title: 'Support' })
              break;

          default:
            itemsData.push({ href:'/support', title: 'Support' })
            break;
        }
      });
    }

    const completeItemsData = itemsData.map( item => {
      item.slug = item.title.replace(' ', '-').toLowerCase();
      item.key = 'menu-item-' + item.href + '-' + item.slug;
      return item
    });

    const menuItems = completeItemsData.map(item => (
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

    const getActiveLabels = () => {
      if(this.props.user.name !== null){
        const userRoles = getUserRoles(this.props.user);
        return userRoles.map(role => {
          switch (role) {
            case 'employee':
              return EmployeeLabel;


            case 'customer':
              return CustomerLabel;

            default:
              return null;
          }
        });
      }
    }

    // Define elements
    const CustomerLabel = (<Label key='customer' color='teal'>Customer</Label>);
    const EmployeeLabel = (<Label key='employee' color='green'>Employee</Label>);


    const ActiveLabels = getActiveLabels();

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

        const profileContent = (
          <>
            <div>
              { ActiveLabels }
            </div>
            <div style={marginTopStyles}>
              <Image src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=120&q=80' avatar />
              <span>{ this.props.user.name }</span>
            </div>
            <div style={marginTopStyles}>
              <span>{this.props.user.email}</span>
            </div>
          </>
        )

        if(access_token !== null){
          profileOrLoginButton = (
            <Dropdown
              as={Menu.Item}
              position='right'
              text={this.props.user.name}
              item
              simple
            >
              <Dropdown.Menu>
                <Dropdown.Item>
                  { profileContent }
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
