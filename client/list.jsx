import React from 'react';
import Icon from '@material-ui/core/Icon';
import { render } from 'react-dom';

function List(props) {
  const { items } = props;
    return(
      <div className="list-elt">
        <div>{items}</div>
        <div><button><Icon>delete</Icon></button></div>
      </div>
    );
}

export default List;