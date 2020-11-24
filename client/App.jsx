import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import List from './list.jsx';
//import * as actions from './actions/actions';

// const mapStateToProps = (state) => ({
//   itemList: state.items.itemList,
//   erroredItems: state.items.erroredItems,
//   loadingItems: state.items.loadingItems
// });

// const mapDispatchToProps = (dispatch) => ({
//   fetchItems: (url) => dispatch(actions.fetchItems(url))
// });

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemList: [],
      addNewItem: '',
      newItemQuantity: '',
    }
    this.handleItemChange = this.handleItemChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    console.log('wtf');
    this.handleFetchItems('/items');
  }

  componentDidUpdate() {
    // this.populateItems();
    //this.handleFetchItems();
  }

  handleItemChange(event) {
    this.setState({addNewItem: event.target.value});
  }

  handleQuantityChange(event) {
    this.setState({newItemQuantity: event.target.value});
  }

  handleFetchItems() {
    fetch('/items')
      .then((res) => res.json())
      .then((items) => {
        console.log('in fetch action');
        console.log(items);
        this.setState({itemList: items});
      })
      .catch(err => console.log(err));  
  };

  deleteItem(event) {
    let index = parseInt(event.target.id.substring(4));
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
    // this.populateItems();
    this.handleFetchItems();
  }

  addItem() {
    const listItem = {
      name: this.state.addNewItem,
      quantity: this.state.newItemQuantity
    };
    // if(this.state.items.includes(this.state.newItem) === false) {
    fetch('/additem', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(listItem)
    })
    .then(console.log(`${listItem.name} was added to your list`))
    .then(this.setState({addNewItem: '', newItemQuantity: ''}))
    .catch(err => console.log(err));
    // this.populateItems();
    this.handleFetchItems();
    // }
    // else {
    //   fetch('/additem', {
    //     method: 'PUT',
    //     headers: {
    //       "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(listItem)
    //   })
    //   .then(console.log('quantity updated'))
    //   .then(this.setState({newItem: '', quantity: ''}))
    //   .catch(err => console.log(err));
    //   // this.populateItems();
    //   this.handleFetchItems();
    // }
  }

  render() {

    let gList = [];
    for(let i = 0; i < this.state.itemList.length; i++) {
      gList.push(
        <List 
          items = {this.state.itemList[i].name}
          itemNum = {this.state.itemList[i].quantity}
          quantities = {this.state.itemList[i].unique_id}
        />);
    }
    return ( 
      <div>
        <form>
          <label>Add new item:</label>
          <input id="item-input" type="text" value={this.state.addNewItem} onChange={this.handleItemChange}></input>
          <label>Quantity:</label>
          <input id="quant-input" type="text" value={this.state.newItemQuantity} onChange={this.handleQuantityChange}></input>
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
//export default connect(mapStateToProps, mapDispatchToProps)(App);