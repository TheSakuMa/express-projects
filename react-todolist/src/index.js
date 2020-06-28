import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: ''
    };
    // this.changeTodo = this.changeTodo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  addTodo(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }

  render() {
    return (
      <main>
        <h3>TODO</h3>
        <div>
          {this.state.items.length}個のタスクがあります。
        </div>
        <TodoList items={this.state.items}/>
        <form id="add-todo" onSubmit={this.addTodo}>
          <label htmlFor="new-todo">
            What needs to be done?
          </label>
          <input id="new-todo" name="text" onChange={this.handleChange} value={this.state.text}/>
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
      </main>
    );
  }
}

class TodoList extends React.Component {
  changeTodo(e, index) {
    e.preventDefault();
    if (e.target.text.value.length === 0) {
      return;
    }
    this.props.items[index].text = e.target.text.value;
    this.setState({
      items: this.props.items.slice(),
    });
    document.getElementById('add-todo').text.focus();
  }

  render() {
    return (
      <div className="todolist-div">
        {this.props.items.map((item, index) => (
          <form key={item.id} onSubmit={e => this.changeTodo(e, index)}>
            <input type="checkbox"/>
            <input type="text" name="text" defaultValue={item.text}/>
          </form>
        ))}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));