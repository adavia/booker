import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import range from 'lodash/range';

const ButtonGroup = Button.Group;

class Pagination extends Component {
  state = { pager: {} }

  componentWillMount = () => {
    const { links } = this.props;

    // Set page if items array isn't empty
    if (links.total_entries) {
      this.setPage(links.current);
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    const { links } = this.props;
    // Reset page if items array has changed
    if (links.total_entries !== prevProps.links.total_entries) {
      this.setPage(links.current);
    }
  }

  setPage = (page) => {
    let items = this.props.links.total_entries;
    let pager = this.state.pager;

    if (page < 1 || page > pager.totalPages) {
      return;
    }

    // Get new pager object for specified page
    pager = this.getPager(items, page);
    // Update state
    this.setState({ pager });
    // Call change page function in parent component
    this.props.onChangePage(page);
  }

  getPager = (totalItems, currentPage = 1, pageSize = 10) => {
    // Calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;
    if (totalPages <= 10) {
      // Less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // More than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // Calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    // Create an array of pages to ng-repeat in the pager control
    const pages = range(startPage, endPage + 1);
    // Return object with all pager properties required by the view
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    }
  }

  formatLink = (path, page) => {
    const parsed = queryString.parse(path);
    parsed.page = page;
    return '?' + queryString.stringify(parsed);
  }

  render() {
    const pager = this.state.pager;
    const { links } = this.props;

    if (!pager.pages || pager.pages.length <= 1) {
      // Don't display pager if there is only 1 page
      return null;
    }

    return (
      <ButtonGroup className="mt20-md mb10-md">
        <Link 
          className="ant-btn"
          to={links.first}
          disabled={links.current === 1}
          onClick={() => this.setPage(1)}>
          <Icon type="step-backward" /> First
        </Link>
        <Link 
          className="ant-btn"
          to={links.prev}
          disabled={links.current === 1}
          onClick={() => this.setPage(links.current - 1)}>
          <Icon type="caret-left" /> Prev
        </Link>
        {pager.pages.map((page, index) =>
          <Link 
            to={this.formatLink(links.first, page)}
            className={`ant-btn ${page === links.current && 'ant-btn-primary'}`}
            key={index}
            onClick={() => this.setPage(page)}>
            {page}
          </Link>
        )}
        <Link
          className="ant-btn"
          to={links.next}
          disabled={links.current === links.total_pages}
          onClick={() => this.setPage(links.current + 1)}>
          Next <Icon type="caret-right" />
        </Link>
        <Link
          className="ant-btn"
          to={links.last}
          disabled={links.current === links.total_pages}
          onClick={() => this.setPage(links.total_pages)}>
          Last <Icon type="step-forward" />
        </Link>
      </ButtonGroup>  
    );
  }
}

export default Pagination;