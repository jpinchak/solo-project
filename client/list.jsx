import React from 'react';
import { render } from 'react-dom';

function List(props) {
  const { items } = props;
    return(<li>{items}</li>);
}

export default List;