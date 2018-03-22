import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Menu, Icon } from 'antd';

class TopBar extends Component {
  state = {
    showItems: false
  }

  handleNavItems = (e) => {
    e.preventDefault();

    this.setState({
      showItems: !this.state.showItems
    });
  }

  selectedNavItem = () => {
    const { location } = this.props;
    
    switch (location.pathname) {
      case "/":
        return ['1'];
      case "/books/own":
        return ['2'];
      default:
        break;
    }
  }

  showLinks = () => {
    const { authenticated, currentUser } = this.props.authStore;

    if (authenticated) {
      return [
        <Menu.Item className="menu-item-right mr30-md" key="4">
          <Link to="/auth/signout"><Icon type="double-right" />Sign Out</Link>
        </Menu.Item>,
        <Menu.Item className="menu-item-right" key="5">
          <Icon type="user" />Welcome, {currentUser.attributes.email}
        </Menu.Item>
      ];
    }
  }

  render() {
    return (
      <Row gutter={32}>
        <Col span={6}>
          <div className="logo">
            <h1>BOOKER</h1>
          </div>
        </Col>
        <Col span={18}>
          <Menu mode="horizontal" className="top-menu" defaultSelectedKeys={this.selectedNavItem()}>
            <Menu.Item className="menu-item" key="1">
              <Link to="/">Home</Link>
            </Menu.Item>
            <Menu.Item className="menu-item" key="2">
              <Link to="/books/own">Your book list</Link>
            </Menu.Item>
            <Menu.Item className="menu-item" key="3">Authors</Menu.Item>
            {this.showLinks()}
          </Menu>
        </Col>
      </Row>
    );
  }
}

export default inject('authStore')(observer(withRouter(TopBar)));