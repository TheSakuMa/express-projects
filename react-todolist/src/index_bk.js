import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: '',
      length: 0,
    };
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
      id: Date.now(),
      checkBox: true,
    };
    let newLength = this.state.length + 1;
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: '',
      length: newLength,
    }));
  }

  render() {
    return (
      <main>
        <h3>TODO</h3>
        <div>
          {this.state.length}個のタスクがあります。
        </div>
        <TodoList items={this.state.items} length={this.state.length} />
        <form id="add-todo" onSubmit={this.addTodo}>
          <label htmlFor="new-todo">
            What needs to be done? :
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

function Toggle(props) {
    return (
      <button
        className={props.check? "checkbox": "checkbox done"}
        onClick={props.onClick}
      >
      </button>
    );
}

function DelBtn(props) {
  return (
    <button type="button" name="delBtn" onClick={props.onClick}>delete</button>
  );
}

class TodoList extends React.Component {
  changeTodo(e, index) {
    e.preventDefault();
    if (e.target.text.value.length === 0) {
      return;
    }
    this.props.items[index].text = e.target.text.value;
    this.setState((state, props) => ({
      items: props.items.slice(),
      length: props.length,
    }));
    document.getElementById('add-todo').text.focus();
  }

  deleteTodo = (e, index) => {
    let newItems = this.props.items.splice(index, 1);
    let newLength = this.props.length - 1;
    this.setState({
      items: newItems,
      length: newLength,
    });
  }

  handleCheck(e, index) {
    this.props.items[index].checkBox = this.props.items[index].checkBox? false: true;
    this.setState((state, props) => ({
      items: props.items,
      length: props.length,
    }));
  }

  render() {
    return (
      <div className="todolist-div">
        {this.props.items.map((item, index) => (
          <form key={item.id} onSubmit={e => this.changeTodo(e, index)}>
            <Toggle check={this.props.items[index].checkBox} onClick={e => this.handleCheck(e, index)}/>
            <input type="text" name="text" defaultValue={item.text}/>
            <DelBtn onClick={e => this.deleteTodo(e, index)}/>
          </form>
        ))}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));