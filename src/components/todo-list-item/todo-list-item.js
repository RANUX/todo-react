import React, { Component } from 'react';

import './todo-list-item.css';

export default class TodoListItem extends Component {

    markDone() {
        const { done } = this.props;
        return done ? 'done' : '';
    }

    markImportant() {
        const { important } = this.props;
        return important ? 'important' : '';
    }

    render() {
        const { label, onDeleted, onToggleImportant, onToggleDone } = this.props;
        
        return (
            <span className={`todo-list-item ${this.markDone()} ${this.markImportant()}`} >
                <span
                    className="todo-list-item-label"
                    onClick={ onToggleDone }
                    >
                    {label}
                </span>
    
                <button type="button"
                        className="btn btn-outline-success btn-sm float-right"
                        onClick={ onToggleImportant }
                        >
                <i className="fa fa-exclamation" />
                </button>
    
                <button type="button"
                        className="btn btn-outline-danger btn-sm float-right"
                        onClick={onDeleted}>
                <i className="fa fa-trash-o" />
                </button>
            </span>
        );
    }
}