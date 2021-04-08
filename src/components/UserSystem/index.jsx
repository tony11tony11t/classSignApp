import React, { Component } from 'react'
import UserInfo from './components/UserInfo'
import Header from '../Header'
import ContainerHeader from "../ContainerHeader"
import Form from '../Form'
import Table from '../Table'
import signInAPI from '../../signInAPI'
import './index.css'

export default class UserSystem extends Component {

    state = {
        page : "index", // "index" | "reset" | "userlist"
        userList : []
    }

    getReset = () => signInAPI.getPage(this , "reset");
    getIndex = () => signInAPI.getPage(this , "index");
    getUserlist = () => signInAPI.getPage(this , "userlist");

    componentDidMount = () => {
        signInAPI.getUserRowData().then(userList => {
            this.setState({userList})
        })
    }

    showContent = () => {
        const {page} = this.state;
        switch(page){
            case "index" : 
                return (
                    <div className="IndexContainer">
                        <UserInfo/>
                        <button onClick={this.getReset}>修改密碼</button>
                        <button onClick={this.getUserlist}>管理會員</button>
                        <button className="btnLogout">登出</button>
                    </div>
                )
            case "reset" :
                let formField = [{
                    type : "text",
                    label : "新密碼",
                    name : "newPassword"
                }]
                return (
                    <div className="ResetPasswordContainer">
                        <ContainerHeader backPage={this.getIndex}/>
                        <Form field={formField} />
                    </div>
                )
            case "userlist" :
                return (
                    <div className="UserlistContainer">
                        <ContainerHeader backPage={this.getIndex}/>
                        <Table rowData    = {this.state.userList} 
                               fields     = {signInAPI.getUserHeadFields()} 
                               className  = "UserTable"/>
                    </div>
                )
        }
    }

    render() {
        return (
            <div className='UserContainer'>
                <Header title="個人資訊" name="User"/>
                <div className='UserWrap'>
                    {this.showContent()}
                </div>
            </div>
        )
    }
}
