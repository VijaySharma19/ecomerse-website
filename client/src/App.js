import React, { Component } from 'react';
import {BrowserRouter as Router , Route} from 'react-router-dom'

import Product from './components/products'

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path='/' component={Product}></Route>
        </Router>
      </div>
    )
  }
}

export default App
