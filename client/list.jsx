import React from 'react';
import Icon from '@material-ui/core/Icon';
import { render } from 'react-dom';

function List(props) {
  const { items, deleter, itemNum, quantities } = props;
    return(
      <div className="list-elt" id={`groceryitem${itemNum}`}>
        <div className="item-name">{items}</div>
        <div className="quantity-name">{quantities}</div>
        <div className="button-holder"><button id={`button${itemNum}`} onClick={deleter}><Icon id={`icon${itemNum}`}>deleteOutlined</Icon></button></div>
      </div>
    );
}

export default List;