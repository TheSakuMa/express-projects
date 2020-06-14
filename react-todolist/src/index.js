import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class TodoList extends React.Component {
  render() {
    return (
      <form className="todolist-form">
        <input type="text"/>
      </form>
    );
  }
}

class TodoForm extends React.Component {
  render() {
    return (
      <form id="todolist-add-form">
        <input type="text"/>
      </form>
    );
  }
}

function App() {
  return (
    <div className="todolists">
      <TodoList />
      <TodoForm />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));