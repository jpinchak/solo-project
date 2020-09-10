import React from 'react';
import { render } from 'react-dom';
import List from './list.jsx';
// import { response } from 'express';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      newItem: '',
      quantity: ''
    };
    this.addItem = this.addItem.bind(this);
    this.populateItems = this.populateItems.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  componentDidMount() {
    this.populateItems();
  }

  handleItemChange(event) {
    this.setState({newItem: event.target.value});
  }

  handleQuantityChange(event) {
    this.setState({quantity: event.target.value});
  }

  populateItems() {
    fetch('/items')
      .then(res => res.json())
      .then(gItems => {
        this.setState({items: gItems})});
  }

  addItem() {
    //const myItem = document.getElementById('item-input');
    //const myQuant = document.getElementById('quant-input');
    const listItem = {
      name: 'bananas',//myItem.value,
      quantity: 7//myQuant.value
    };
    //myItem.parentElement.reset();
    fetch('/additem', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(listItem)
    })
    .then(console.log(`${listItem.name} was added to your list`))
    .then(this.setState({newItem: '', quantity: ''}))
    .catch(err => console.log(err));
    this.populateItems();
  }

  render() {
    let gList = [];
    for(let i = 0; i < this.state.items.length; i++) {
      gList.push(
        <List 
          items = {this.state.items[i]}
          key = {`groceryItem${i}`}
        />);
    }
    return ( 
      <div>
        <form>
          <label>New item:</label>
          <input id="item-input" type="text" value={this.state.newItem} onChange={this.handleItemChange}></input>
          <label>Quantity:</label>
          <input id="quant-input" type="text" value={this.state.quantity} onChange={this.handleQuantityChange}></input>
        </form>
        <button onClick={this.addItem}>Add item</button>
        <div className="list" id="julie">Julie's items
          <ul>
            {gList}
          </ul>
        </div>
      </div>
    )
  }
};

export default App;