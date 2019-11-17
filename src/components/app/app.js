import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

class App extends Component {

    maxId = 0;

    state = {
        todoData: [],
        term: '',
        filter: 'all'
    }

    componentDidMount() {
        this.addItem('Drink Coffee');
        this.addItem('Make awesome app');
        this.addItem('Have a lunch');
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: todoData.filter((el) => el.id !== id)
            }
        });
    }

    addItem = (label) => {
        this.setState(({ todoData }) => {
            return {
                todoData: [...todoData, this.createTodoItem(label)]
            }
        });
    }

    createTodoItem(label) {
        return {
            label: label,
            important: false,
            done: false,
            id: ++this.maxId
        }
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex( (el) => el.id === id );
            const oldItem = todoData[idx];
            const newItem = { ...oldItem, important: !oldItem.important };
            const newTodoData = [
                ...todoData.slice(0, idx),
                newItem,
                ...todoData.slice(idx+1)
            ]
            return {
                todoData: newTodoData
            }
        });
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex( (el) => el.id === id );
            const oldItem = todoData[idx];
            const newItem = { ...oldItem, done: !oldItem.done };
            const newTodoData = [
                ...todoData.slice(0, idx),
                newItem,
                ...todoData.slice(idx+1)
            ]
            return {
                todoData: newTodoData
            }
        });
    }

    search(items, term) {
        if (term.length === 0) return items;

        return items.filter((el) => {
            const labelLowered = el.label.toLowerCase();
            const termLowered = term.toLowerCase();
            return labelLowered.indexOf(termLowered) >= 0;
        });
    }

    onSearch = (text) => {
        this.setState({
            term: text
        });
    }

    filter(items, filter) {
        if (filter === 'all') return items;

        return items.filter((el) => {
            if (filter === 'done' && el.done) return true;
            else if (filter === 'active' && !el.done) return true;
            return false;
        });
    }

    onFilter = (filter) => {
        this.setState({
            filter
        });
    }

    render() {
        const { todoData, term, filter } = this.state;
        let visibleItems = this.search(todoData, term);
        let filteredItems = this.filter(visibleItems, filter);

        return (
            <div className="todo-app">
              <AppHeader toDo={1} done={3} />
              <div className="top-panel d-flex">
                <SearchPanel onSearch={ this.onSearch } />
                <ItemStatusFilter onFilter={ this.onFilter } />
              </div>
        
              <TodoList 
                todos={ filteredItems } 
                onDeleted={ this.deleteItem } 
                onToggleImportant={ this.onToggleImportant }
                onToggleDone={ this.onToggleDone }
                />
              <ItemAddForm onAdd={ this.addItem }/>
            </div>
          );
    }
}

export default App;