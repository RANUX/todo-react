import React, { Component } from 'react';

import FilterButton from './filter-button';
import './item-status-filter.css';

export default class ItemStatusFilter extends Component {


  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active'},
    { name: 'done', label: 'Done' }
  ]

  filterButtons() {
    const {filter , onFilter } = this.props;

    return this.buttons.map(({name, label}) => {
      return (<FilterButton key={name}
                            name={name} 
                            label={label} 
                            highlight={filter === name}
                            onButtonClick={onFilter} />);
    });
  }

  render() {
    return (
      <div className="btn-group">
        {this.filterButtons()}
      </div>
    );
  }
}
