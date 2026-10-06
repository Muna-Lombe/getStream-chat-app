import React from 'react'
import ReactDom from 'react-dom'
import { Provider } from 'react-redux';

// Provider
// ChatProvider
import App from './App'
import reduxStore from './redux/store';
import SelectUser from './selectUser/SelectUser';
const ReduxWrappedApp = ()=>(
  <Provider store={reduxStore}>
    <App/>
  </Provider >
)
ReactDom.render(
  <ReduxWrappedApp/>,
  // <SelectUser/>,
document.getElementById('root'));

