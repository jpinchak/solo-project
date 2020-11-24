import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
//import store from './store';
import { Provider } from 'react-redux';
import '../assets/styles/styles.css';

render(<App />, document.getElementById('main-div'));