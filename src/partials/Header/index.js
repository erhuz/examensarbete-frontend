import React, { Component } from 'react';
import {
  Link
} from "react-router-dom";
import { ReactReduxContext } from 'react-redux';
import { Menu, Dropdown, Icon, Image } from 'semantic-ui-react';



export default class Header extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: {
        name: null,
        email: null,
        img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=120&q=80',
      }
    }
  }

  componentDidMount() {
    this.userLogin();
  }

  userLogin = () => {
    const fakeForm = new FormData();
    // fakeForm.append('name', 'John Doe');
    fakeForm.append('email', 'john.doe@example.com');
    fakeForm.append('password', 'pass1234');
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
  }

  userLogout = () => {
    this.props.REMOVE_ACCESS_TOKEN();
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

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

    return (
      <ReactReduxContext.Consumer>
        {({store}) => {
          const { access_token } = store.getState().authReducer;

          let profileButton = (
            <Menu.Item
              position='right'
              name='login'
              active={activeItem === 'login'}
              onClick={this.userLogin}
              content='Log In'
            />
          )

          if(access_token !== null){
            console.log('access_token is not null');

            profileButton = (
              <Dropdown
                as={Menu.Item}
                position='right'
                text='Profile'
                item
                simple
              >
                <Dropdown.Menu>
                  <Dropdown.Item style={{hover: { backgroundColor: '#fff !important' }}}>
                    <div>
                      <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' avatar />
                      <span style={{marginLeft: 8}}>John Doe</span>
                    </div>
                    <div style={{marginTop: 18}}>
                      john.doe@example.com
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Divider/>
                  <Dropdown.Item onClick={this.userLogout}>Log Out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )
          }else {
            console.log('access_token is nulled');
          }


          return(
          <Menu>
            { menuItems }

            { profileButton }
          </Menu>
          );
        }}
      </ReactReduxContext.Consumer>
    )
  }
}
