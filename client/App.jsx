import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
import List from './list.jsx';
import * as actions from './actions/actions';

const mapStateToProps = (state) => ({
  itemList: state.items.itemList,
  erroredItems: state.items.erroredItems,
  loadingItems: state.items.loadingItems
});

const mapDispatchToProps = (dispatch) => ({
  fetchItems: (url) => dispatch(actions.fetchItems(url))
});

export class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchItems('/items');
    console.log('wtf');
  }

  // componentDidUpdate() {
  //   this.populateItems();
  // }

  // handleItemChange(event) {
  //   this.setState({newItem: event.target.value});
  // }

  // handleQuantityChange(event) {
  //   this.setState({quantity: event.target.value});
  // }

  // deleteItem(event) {
  //   let index = parseInt(event.target.id.substring(4));
  //   const deleter = index;
  //   console.log(deleter);
  //   const listItem = {
  //     index: deleter
  //   };
  //   fetch('/deleteitem', {
  //     method: 'DELETE',
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(listItem)
  //   })
  //   .then(console.log(`${listItem.index} was removed from your list`))
  //   .catch(err => console.log(err));
  //   this.populateItems();
  // }

  // addItem() {
  //   const listItem = {
  //     name: this.state.newItem,
  //     quantity: this.state.quantity
  //   };
  //   if(this.state.items.includes(this.state.newItem) === false) {
  //     fetch('/additem', {
  //       method: 'POST',
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(listItem)
  //     })
  //     .then(console.log(`${listItem.name} was added to your list`))
  //     .then(this.setState({newItem: '', quantity: ''}))
  //     .catch(err => console.log(err));
  //     this.populateItems();
  //   }
  //   else {
  //     fetch('/additem', {
  //       method: 'PUT',
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(listItem)
  //     })
  //     .then(console.log('quantity updated'))
  //     .then(this.setState({newItem: '', quantity: ''}))
  //     .catch(err => console.log(err));
  //     this.populateItems();
  //   }
  // }

  render() {

    let gList = [];
    for(let i = 0; i < this.props.itemList.length; i++) {
      gList.push(
        <List 
          items = {this.props.itemList[i].itemName}
          itemNum = {this.props.itemList[i].quantity}
          quantities = {this.props.itemList[i].uniqueId}
        />);
    }
    return ( 
      <div>
        <form>
          <label>Add new item:</label>
          <input id="item-input" type="text" value=''></input>
          <label>Quantity:</label>
          <input id="quant-input" type="text" value=''></input>
        </form>
        <button className="add-item">Add item</button>
        <div className="list" id="julie">
          {gList}
        </div>
      </div>
    )
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);