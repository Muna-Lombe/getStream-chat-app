import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux';

// Provider
// ChatProvider
import App from './App'
import reduxStore from './redux/store';

ReactDom.render(
  <Provider store={reduxStore}>
    <App/>
  </Provider >,

document.getElementById('root'));

