import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
  state = {
    currentButton: 'all'
  }

  highlight(buttonName) {
    return this.state.currentButton === buttonName ? 'btn-info' : 'btn-outline-secondary';
  }

  onFilterButton(buttonName) {
    this.props.onFilter(buttonName);
    this.setState({
      currentButton: buttonName
    });
  }

  render() {
    return (
      <div className="btn-group">
        <button type="button"
                className={`btn ${this.highlight('all')}`}
                onClick={() => this.onFilterButton('all')}>All</button>
        <button type="button"
                className={`btn ${this.highlight('active')}`}
                onClick={() => this.onFilterButton('active')}>Active</button>
        <button type="button"
                className={`btn ${this.highlight('done')}`}
                onClick={() => this.onFilterButton('done')}>Done</button>
      </div>
    );
  }
}
