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
        todoData: []
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
            visible: true,
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

    onSearch = (text) => {
        this.setState(({ todoData }) => {
            return todoData.map((el) => {
                const labelLowered = el.label.toLowerCase();
                const textLowered = text.toLowerCase();
                labelLowered.indexOf(textLowered) >= 0 ? el.visible = true : el.visible = false;
                return el;
            });
        });
    }

    onFilter = (filter) => {
        this.setState(({ todoData }) => {
            return todoData.map((el) => {
                el.visible = false;
                if (filter === 'done' && el.done) el.visible = true;
                else if (filter === 'active' && !el.done) el.visible = true;
                else if (filter === 'all') el.visible = true;
                return el;
            });
        });
    }

    render() {
        const { todoData } = this.state;
        return (
            <div className="todo-app">
              <AppHeader toDo={1} done={3} />
              <div className="top-panel d-flex">
                <SearchPanel onSearch={ this.onSearch } />
                <ItemStatusFilter onFilter={ this.onFilter } />
              </div>
        
              <TodoList 
                todos={ todoData } 
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