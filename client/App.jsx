import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return ( 
      <div>
        <h1>Grocery List</h1>
      </div>
    )
  }
};

export default App;