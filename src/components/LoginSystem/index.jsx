import React, { Component } from 'react'
import './index.css'

export default class LoginSystem extends Component {
    handleClickSubmit = () => {
        this.props.changePage("signIn")
    }
    render() {
        return (
            <div className="LoginContainer">
                <img src="../../img/login_logo.png"/>
                <h2>圓月活學苑</h2>
                <form>
                    <input type="text" placeholder="帳號"/><br/>
                    <input type="text" placeholder="密碼"/>
                </form>
                <button className="submit" onClick={this.handleClickSubmit}>登入</button>
            </div>
        )
    }
}
