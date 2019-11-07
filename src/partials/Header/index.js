import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, Label, Image, Icon } from 'semantic-ui-react';
import AcceptCallModal from 'components/AcceptCallModal';
import { getUserRoles, userHasRole } from 'helpers/user';
import echoHelper from 'helpers/echo';

export default class Header extends Component {
  constructor(props){
    super(props);

    this.state = {
      subscribedToWebsockets: false,
      incomingCall: false,
      waitingOnCall: false,
      call: null,
    }
  }

  componentWillUnmount() {
    const { user } = this.props;

    if(user !== null){
      if(userHasRole(user, 'employee')){
        const Echo = echoHelper(this.props.access_token)

        Echo.leaveChannel('orders');
      }
    }
  }

  userLogout = () => {
    this.props.REMOVE_ACCESS_TOKEN();
    this.props.REMOVE_USER_DATA();
    this.setUserStatusWithFetch('offline');
    // Uncomment line below when user unsubscribes from channels on logout
    // this.setState({ subscribeToWebsockets: false });
  }

  subscribeToWebsockets = () => {
    if(
      this.props.user.name !== null &&
      this.state.subscribedToWebsockets === false
    ){
      const user = this.props.user;
      const Echo = echoHelper(this.props.access_token);

      this.setState({ subscribedToWebsockets: true });

      if(userHasRole(user, 'employee')){
        console.log('User subscribed to individual channel');

        Echo.private('App.User.' + this.props.user.id)
          .listen('CallRequested', event => {
            console.log('Incoming Call:');
            console.log(event);
            this.setState({ incomingCall: true, call: event.call });
          })
          .listen('UserStatusUpdated', event => {
            this.setUserStatus(event.status);
          })
          .listen('CallInitialized', event => {
            console.log('Call Initialized:');
            console.log(event);
          });
      } else {
        Echo.private('App.User.' + this.props.user.id)
          .listen('CallAccepted', event => {
            console.log('Your Call Has Been Accepted');
            console.log(event);

          })
          .listen('CallInitialized', event => {
            console.log('Call Initialized:');
            console.log(event);
          });
      }
    }
  }

  setUserStatusWithFetch = (status) => {
    const { access_token } = this.props;

    const statusForm = new FormData();
    statusForm.append('status', status);

    fetch(process.env.REACT_APP_BACKEND_REST_API + '/user/status', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: statusForm,
    })
    .then(res => res.json())
    .then(json => {
      this.setUserStatus(json.status);
    })
    .catch(err => {
      console.error(err);
    });
  }

  setUserStatus = (status) => {
    this.props.UPDATE_USER_STATUS(status);
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  handleAcceptedCall = () => {
    this.setState({ waitingOnCall: true });
    const { access_token } = this.props;

    fetch(process.env.REACT_APP_BACKEND_REST_API + '/call/accept/' + this.state.call.id, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then(res => res.json())
    .then(json => {
      this.setState({ waitingOnCall: false, incomingCall: false });
    })
    .catch(err => {console.error(err)});
  }

  render() {
    const { activeItem } = this.state

    // INLINE STYLES
    const marginTopStyles = { marginTop: 14 };
    const floatRightStyles = { float: 'right' };

    // Subscribe to websockets
    this.subscribeToWebsockets();

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

    const MenuItems = completeItemsData.map(item => (
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

    const getActiveRoleLabels = () => {
      if(this.props.user.name !== null){
        const userRoles = getUserRoles(this.props.user);

        // Define elements
        const CustomerLabel = (<Label key='customer' color='teal'>Customer</Label>);
        const EmployeeLabel = (<Label key='employee' color='blue'>Employee</Label>);

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

    const getActiveStatusLabel = () => {
      if(this.props.user.status !== null){
        const { status } = this.props.user;

        const OnlineLabel = (<Label circular color='green' floating>Online</Label>);
        const BusyLabel = (<Label circular color='red' floating>Busy</Label>);
        const OnBreakLabel = (<Label circular color='yellow' style={{whiteSpace: 'nowrap'}} floating>On Break</Label>);
        const OfflineLabel = (<Label circular color='grey' floating>Offline</Label>);


        switch (status) {
          case 'online':
            return OnlineLabel;

          case 'busy':
            return BusyLabel;

          case 'on_break':
            return OnBreakLabel;

          case 'offline':
            return OfflineLabel;

          default:
            return null;
        }
      }
    }

    // Define elements to render

    const ActiveRoleLabels = getActiveRoleLabels();
    let ActiveStatusLabel = getActiveStatusLabel();

    const getMenuContent = () => {
      const { access_token } = this.props;


      const profileContent = (
        <>
            <div>
              { ActiveRoleLabels }
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

        let StatusSelection = null;

        if(
          this.props.user !== null &&
          this.props.user.roles !== null &&
          userHasRole(this.props.user, 'employee')
          ){
          StatusSelection = (
            <Dropdown.Item>
              <Dropdown icon={null} fluid simple>
                <>
                  Set Your Status <Icon name='flag' style={floatRightStyles} />
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => {this.setUserStatusWithFetch('online')}}><Label circular color='green' empty /><span>Online</span></Dropdown.Item>
                    <Dropdown.Item onClick={() => {this.setUserStatusWithFetch('busy')}}><Label circular color='red' empty /><span>Busy</span></Dropdown.Item>
                    <Dropdown.Item onClick={() => {this.setUserStatusWithFetch('on_break')}}><Label circular color='yellow' empty /><span>On Break</span></Dropdown.Item>
                    <Dropdown.Item onClick={() => {this.setUserStatusWithFetch('offline')}}><Label circular color='grey' empty /><span>Offline</span></Dropdown.Item>
                  </Dropdown.Menu>
                </>
              </Dropdown>
            </Dropdown.Item>
          );
        } else {
          ActiveStatusLabel = null;
        }


        let ProfileButton;
        if(access_token !== null){
          ProfileButton = (
            <Dropdown
            as={Menu.Item}
            position='right'
            text={this.props.user.name}
            item
            simple
            >
              <>
                { ActiveStatusLabel }
                <Dropdown.Menu>
                  <Dropdown.Item>
                    { profileContent }
                  </Dropdown.Item>
                  <Dropdown.Divider/>
                  <Dropdown.Item onClick={this.userLogout}>Log Out <Icon name='log out' style={floatRightStyles} /></Dropdown.Item>
                  <Dropdown.Item >Account <Icon name='user' style={floatRightStyles} /></Dropdown.Item>
                  { StatusSelection }
                </Dropdown.Menu>
              </>
            </Dropdown>
          )
        }


        return(
            <>
              { MenuItems }
              { ProfileButton }
            </>
        );
    }

    const MenuContent = getMenuContent();

    // Move logic out of render function with the help of this.props
    return (
      <>
        <Menu>
          { MenuContent }
        </Menu>
        <AcceptCallModal
          open={this.state.incomingCall}
          isLoading={this.state.waitingOnCall}
          handleAcceptedCall={() => { this.handleAcceptedCall() }}
        />
      </>
    )
  }
}
