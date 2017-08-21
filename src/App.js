import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

import userStore from './stores/UserStore.js'

class App extends Component {
  constructor(){
    super()
    this.state = userStore.getState()
    const unsubscribe = userStore.subscribe(() => this.setState(userStore.getState()))
  }

  onClickUser() {
    userStore.dispatch({ type: 'FETCH_USER', promise: axios.get('https://randomuser.me/api/')})    
  }

  onClickNormal(){
    userStore.dispatch({ type: 'NORMAL_ACTION', promise:'text'})    
  }

  _renderUser(){
    if(this.state.user.name === undefined) return
    return (<div>{this.state.user.name.first}</div>)
  }

  render() {
    return (
      <div className="App">
        <h2> Open the console to see the logs </h2>
          {this.state.hasError ? "Error": ''}
          {this.state.isLoading ? "loading" : this._renderUser()}
        <button onClick={this.onClickUser}>GET USER </button>
        <button onClick={this.onClickNormal}>NORMAL ACTION </button>

      </div>
    );
  }
}

export default App;
