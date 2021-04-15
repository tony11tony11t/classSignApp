import React, { Component } from 'react'
import Header from '../Header'
import UserList from "./components/UserList"
import ResetPw from "./components/ResetPw"
import NewUser from './components/NewUser'
import signInAPI from '../../signInAPI'
import { v4 as uuidv4 } from 'uuid';
import './index.css'

export default class UserSystem extends Component {

    state = {
        page : "index", // "index" | "reset" | "userlist" | "new"
        userList : []
    }

    componentDidMount = () => {
        this.refreshUserData();
    }

    getReset = () => signInAPI.getPage(this , "reset");

    getIndex = () => {
        this.refreshUserData();
        signInAPI.getPage(this , "index");
    }
    
    getUserlist = () => signInAPI.getPage(this , "userlist");
    getNew = () => signInAPI.getPage(this , "new");

    refreshUserData = () => {
        signInAPI.getUserData(signInAPI.username).then(d => {
            const {username , password , role} = d;
            this.setState({username , password , role})
        })
    }

    logout = () => {
        this.props.changePage("login")
    }
    delete = () => {
        signInAPI.removeUser().then(_=>this.props.changePage("login"));
    }
    showUserListBtn = () => {
        const {role} = this.state;
        if(role === "admin"){
            return <button onClick={this.getUserlist}>管理會員</button>
        }
    }

    showContent = () => {
        const {page} = this.state;
        switch(page){
            case "index" : 
                return (
                    <div className="IndexContainer">
                        <table className="UserInfo">
                            <tbody>
                                {
                                    signInAPI.getUserHeadFields().map(field => (
                                        <tr key={uuidv4}>
                                            <td>{field[0].name}:</td>
                                            <td>{this.state[field[0].className]}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <button onClick={this.getReset}>修改密碼</button>
                        {this.showUserListBtn()}
                        <button className="btnLogout" onClick={this.logout}>登出</button>
                        <button className="btnDelete" onClick={this.delete}>刪除帳號</button>
                    </div>
                )
            case "reset" :
                return <ResetPw index={this.getIndex}/>
            case "userlist" :
                return <UserList index={this.getIndex} new={this.getNew}/>
            case "new" :
                return <NewUser userList={this.getUserlist}/>
            default : break;
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
