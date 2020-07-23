import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      items: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.changeTodo = this.changeTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
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
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: '',
    }));
  }

  changeTodo(e, index) {
    e.preventDefault();
    if (e.target.text.value.length === 0) {
      return;
    }
    let newItems = this.state.items.slice();
    newItems[index].text = e.target.text.value;
    this.setState({
      items: newItems,
    });
    document.getElementById('add-todo').text.focus();
  }

  toggleTodo(e, index) {
    let newCheckStatus = !(this.state.items[index].checkBox);
    let newItems = this.state.items.slice();
    newItems[index].checkBox = newCheckStatus;
    this.setState({
      items: newItems,
    });
  }

  deleteTodo(e, index) {
    e.preventDefault();
    let newItems = this.state.items.slice();
    newItems.splice(index, 1);
    this.setState({
      items: newItems,
    });
  }

  render() {
    /* mapメソッドでitemsを展開し、要素分のTodoコンポーネントを呼び出す */
    const todos = this.state.items.map((item, index) => {
      return (
        <Todo 
          key={item.id} item={item} index={index} onSubmitCallBack={this.changeTodo} onDeleteCallBack={this.deleteTodo} onToggleCallBack={this.toggleTodo}
        />
      );
    });
    
    return (
      <main>
        <h3>TODO</h3>
        <div>
          {this.state.items.length}個のタスクがあります。
        </div>
        <div id="todos-div">
          {todos}
        </div>
        <form id="add-todo" onSubmit={this.addTodo}>
          <input type="text" name="text" onChange={this.handleChange} value={this.state.text}/>
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
      </main>
    )
  }
}

class Todo extends React.Component {
  /* 親要素のイベントハンドラを呼び出すメソッドを定義 */
  submitEvent(e, index) {
    this.props.onSubmitCallBack(e, index);
    return;
  }
  clickEvent(e, index) {
    this.props.onDeleteCallBack(e, index);
    return;
  }
  checkEvent(e, index) {
    this.props.onToggleCallBack(e, index);
    return;
  }

  render() {
    return (
      <form key={this.props.item.id} onSubmit={e => this.submitEvent(e, this.props.index)}>
        <div className={this.props.item.checkBox? "checkbox": "checkbox checked"} onClick={e => this.checkEvent(e, this.props.index)}></div>
        <input type="text" name="text" defaultValue={this.props.item.text}/>
        <button type="button" onClick={e => this.clickEvent(e, this.props.index)}>
          delete
        </button>
      </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));