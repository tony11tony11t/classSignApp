import React, { Component } from 'react'
import signInAPI from '../../signInAPI'
import './index.css'

export default class LoginSystem extends Component {
    state = {
        username : "",
        password : "",
        tips : ""
    }
    handleClickSubmit = () => {
        const {username,password} = this.state;
        signInAPI.login(username,password).then(result => {
            if(result === 200){
                signInAPI.username = username
                this.props.changePage("signIn")
            }else{
                this.setState({tips:result})
            }
        });
    }
    handleGetUsername = e => this.setState({username : e.target.value})
    handleGetPassword = e => this.setState({password : e.target.value})

    render() {
        return (
            <div className="LoginContainer">
                <img src="../../img/login_logo.png" alt="logo"/>
                <h2>圓月活學苑</h2>
                <form>
                    <input type="text" placeholder="帳號" name="username" onChange={this.handleGetUsername}/><br/>
                    <input type="text" placeholder="密碼" name="password" onChange={this.handleGetPassword}/>
                </form>
                <p>{this.state.tips}</p>
                <button className="submit" onClick={this.handleClickSubmit}>登入</button>
            </div>
        )
    }
}
