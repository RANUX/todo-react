import React, { Component } from 'react';

export default class SearchPanel extends Component {
  state = {
    text: ''
  }

  onTextChanged = (event) => {
    const text = event.target.value;
    this.setState({
      text
    });
    this.props.onSearch(text);
  }

  render() {
    return (
      <input type="text"
             className="form-control search-input"
             placeholder="type to search"
             onChange={this.onTextChanged}
             value={this.state.text} />
    );
  }
}