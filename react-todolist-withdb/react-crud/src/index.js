
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const axiosBase = require('axios');

const axios = axiosBase.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  responseType: 'json'  
});

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

  componentDidMount() {
    axios.get('/')
      .then(response => {
        this.setState({
          text: '',
          items: response.data.todoList
        });
      })
      .catch(function(err) {
        console.log(err);
      });
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
      id: Date.now(),
      text: this.state.text,
      status: true,
    };
    const postData = JSON.stringify(newItem);
    axios.post('/', postData)
      .then(response => console.log(response))
      .catch(err => console.log(err));

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

    axios.post(`/${newItems[index].id}`, newItems[index])
      .then(response => console.log(response))
      .catch(err => console.log(err));
    
    this.setState({
      items: newItems,
    });
    document.getElementById('add-todo').text.focus();
  }

  toggleTodo(e, index) {
    let newCheckStatus = !(this.state.items[index].status);
    let newItems = this.state.items.slice();
    newItems[index].status = newCheckStatus;

    axios.post(`/${newItems[index].id}`, newItems[index])
      .then(response => console.log(response))
      .catch(err => console.log(err));

    this.setState({
      items: newItems,
    });
  }

  deleteTodo(e, index) {
    e.preventDefault();
    let newItems = this.state.items.slice();
    let deleteItemsId = this.state.items[index].id;
    newItems.splice(index, 1);

    axios.delete(`/${deleteItemsId}`, newItems[index])
      .then(response => console.log(response))
      .catch(err => console.log(err));

    this.setState({
      items: newItems,
    });
  }

  render() {
    /* mapメソッドでthis.state.itemsを展開し、要素分のTodoコンポーネントを呼び出す */
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
          <div id="empty-div"></div>
          <input type="text" name="text" onChange={this.handleChange} value={this.state.text}/>
          <button className="btn">
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
      <form key={this.props.item.id} onSubmit={e => this.submitEvent(e, this.props.index)} className={this.props.item.status? "": "checked"}>
        <div className="checkbox" onClick={e => this.checkEvent(e, this.props.index)}></div>
        <input type="text" name="text" defaultValue={this.props.item.text}/>
        <button type="button" onClick={e => this.clickEvent(e, this.props.index)} className="btn">
          delete
        </button>
      </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));