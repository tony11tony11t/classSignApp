import './App.css';
import Footer from './components/Footer';
import SignInSystem from './components/SignInSystem'
import LogSystem from './components/LogSystem'
import GroupSystem from './components/GroupSystem'
import ClassroomSystem from './components/ClassroomSystem'
import UserSystem from './components/UserSystem'
import LoginSystem from './components/LoginSystem'

import React, { Component } from 'react'

export default class App extends Component {

  state = {
    system : "class" // "group" | "log" | "signIn" | "class" | "user" | "login" 
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
        return <UserSystem changePage={this.changeSystem}/>
      case 'login':
        return <LoginSystem changePage={this.changeSystem}/>
      default : break;
    }
    return system
  }
  
  render() {
    const {system} = this.state;
    return (
      <>
      {this.getPageComponent(system)}
      {system === "login" ? null : <Footer changePage={this.changeSystem} system={system}/>}
      </>
    );
  }

}
