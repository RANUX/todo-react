import React, { Component } from 'react';

export default class FilterButton extends Component {
    highlight(highlight) {
        return highlight ? 'btn-info' : 'btn-outline-secondary';
    }

    render() {
        const { name, label, highlight, onButtonClick } = this.props;

        return <button type="button"
                       className={`btn ${this.highlight(highlight)}`}
                       onClick={() => onButtonClick(name)}>{label}</button>
    }
};
