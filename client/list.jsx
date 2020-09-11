import React from 'react';
import Icon from '@material-ui/core/Icon';
import { render } from 'react-dom';

function List(props) {
  const { items, deleter, itemNum, quantities, editer } = props;
    return(
      <div className="list-elt" id={`groceryitem${itemNum}`}>
        <div className="item-name">{items}</div>
        <div className="quantity-name">{quantities}</div>
        <div className="editer-holder"><button id={`editer${itemNum}`} onClick={editer}><Icon id={`icoE${itemNum}`}>edit</Icon></button></div>
        <div className="deleter-holder"><button id={`deleter${itemNum}`} onClick={deleter}><Icon id={`icoD${itemNum}`}>deleteOutlined</Icon></button></div>
      </div>
    );
}

export default List;