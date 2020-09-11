import React from 'react';
import { render } from 'react-dom';
import List from './list.jsx';
// import { response } from 'express';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      quantities: [],
      unique_id: [],
      newItem: '',
      quantity: ''
    };
    this.addItem = this.addItem.bind(this);
    this.populateItems = this.populateItems.bind(this);
    this.handleItemChange = this.handleItemChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
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

  deleteItem(event) {
    let index = parseInt(event.target.id.substring(4));
    console.log('index', event.target);
    const deleter = index;
    console.log(deleter);
    const listItem = {
      index: deleter
    };
    fetch('/deleteitem', {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(listItem)
    })
    .then(console.log(`${listItem.index} was removed from your list`))
    .catch(err => console.log(err));
    this.populateItems();
  }

  populateItems() {
    fetch('/items')
      .then(res => res.json())
      .then(gItems => {
        this.setState({
          items: gItems.items,
          quantities: gItems.quantity,
          unique_id: gItems.unique_ids
        });
      }
    );
  }

  addItem() {
    const listItem = {
      name: this.state.newItem,
      quantity: this.state.quantity
    };
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
          itemNum = {this.state.unique_id[i]}
          deleter = {this.deleteItem}
          quantities = {this.state.quantities[i]} 
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
        <button className="add-item" onClick={this.addItem}>Add item</button>
        <div className="list" id="julie">
          {gList}
        </div>
      </div>
    )
  }
};

export default App;