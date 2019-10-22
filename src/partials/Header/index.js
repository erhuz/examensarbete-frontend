import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import {
  Link
} from "react-router-dom";
import { ReactReduxContext } from 'react-redux';



export default class Header extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    const itemsData = [
      { href:'/', title: 'Home' },
      { href:'/about', title: 'About' },
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
          if(store.subscribe)

          return<Menu>
            { menuItems }
          </Menu>
        }}
      </ReactReduxContext.Consumer>
    )
  }
}
