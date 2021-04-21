import React, { Component } from 'react'
import ClassroomSystem      from './components/ClassroomSystem'
import SignInSystem         from './components/SignInSystem'
import LoginSystem          from './components/LoginSystem'
import GroupSystem          from './components/GroupSystem'
import UserSystem           from './components/UserSystem'
import LogSystem            from './components/LogSystem'
import Footer               from './components/Footer';
import signInAPI            from './signInAPI'
import './App.css';


export default class App extends Component {

  state = {
    /**
     * Decide which component will be shown
     */
    system : "login" // "group" | "log" | "signIn" | "class" | "user" | "login" 
  }

  constructor(props){
    super(props);
    if(signInAPI.username){
      this.state.system = "signIn"
    }
  }

  /**
   * Change system for the state
   * @param {String} system 
   */
  changeSystem = system => this.setState({system});

  /**
   * Change component which can be shown
   * @param {String} system 
   */
  getPageComponent = system => {
    switch(system){
      case 'signIn':  
        return <SignInSystem changePage = {this.changeSystem}/>
      case 'log':
        return <LogSystem />
      case 'group':
        return <GroupSystem />
      case 'class':
        return <ClassroomSystem />
      case 'user':
        return <UserSystem changePage = {this.changeSystem}/>
      case 'login':
        return <LoginSystem changePage = {this.changeSystem}/>
      default : break;
    }
    return system
  }
  
  render() {
    const {system} = this.state;
    return (
      <>
      {this.getPageComponent(system)}
      {system === "login" ? null : <Footer changePage = {this.changeSystem} system = {system}/>}
      </>
    );
  }

}
