import './App.css';
import Footer from './components/Footer';
import SignInSystem from './components/SignInSystem'
import LogSystem from './components/LogSystem'
import GroupSystem from './components/GroupSystem'
import ClassroomSystem from './components/ClassroomSystem'
import UserSystem from './components/UserSystem'

import React, { Component } from 'react'

export default class App extends Component {

  state = {
    system : "user" // "group"|"log"|"signIn"|"class"|"user"
  }

  changeSystem = (system) => this.setState({system});

  getPageComponent = (system) => {
    switch(system){
      case 'signIn':  
        return <SignInSystem changePage={this.changeSystem}/>
      case 'log':
        return <LogSystem />
      case 'group':
        return <GroupSystem />
      case 'class':
        return <ClassroomSystem />
      case 'user':
        return <UserSystem />
    }
    return system
  }
  
  render() {
    const {system} = this.state;
    return (
      <>
      {this.getPageComponent(system)}
      <Footer changePage={this.changeSystem} system={system}/>
      </>
    );
  }

}
