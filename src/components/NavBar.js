import React, { Component } from 'react';
import { Menu, Icon, Image } from 'semantic-ui-react';
import UserLogin from './UserLogin';
import ccwjLogoUrl from '../assets/ccwj.png';

class NavBar extends Component {

  render() {
    return (
      <div>
        <Menu inverted>
          <Menu.Item name="CCWJ Image Annotations" active={false}>
            <Icon name="image"/>
            <b>Image Annotations</b>
          </Menu.Item>
          <Menu.Item style={{'paddingTop': '5px', 'paddingBottom': '5px'}}>
            <Image 
              src={ccwjLogoUrl} 
              size='small'
              style={{'width': '130px'}}/>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item active={false} name="userlogin" style={{'paddingTop': '5px', 'paddingBottom': '5px'}}>
              <UserLogin user={this.props.user} />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  }
}

export default NavBar;