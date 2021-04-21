import React, { Component } from 'react'
import { v4 as uuidv4 }     from 'uuid';
import UserList             from "./components/UserList"
import ResetPw              from "./components/ResetPw"
import NewUser              from './components/NewUser'
import Header               from '../Header'
import signInAPI            from '../../signInAPI'
import './index.css'

export default class UserSystem extends Component {

    state = {
        /**
         * Decide which component will be shown
         */
        page : "index", // "index" | "reset" | "userlist" | "new"

        /**
         * Save user data
         */
        userList : []
    }

    componentDidMount = () => {
        //Loading user data
        this.refreshUserData();
    }

    /**
     * Change to reset password page
     */
    getReset    = () => signInAPI.getPage(this , "reset");

    /**
     * Change to index
     */
    getIndex    = () => {
        this.refreshUserData();
        signInAPI.getPage(this , "index");
    }
    
    /**
     * Change to users list page
     */
    getUserlist = () => signInAPI.getPage(this , "userlist");

    /**
     * Change to create new user page
     */
    getNew      = () => signInAPI.getPage(this , "new");

    /**
     * Change to login page
     */
    logout      = () => {
        this.props.changePage("login");
        signInAPI.username = ""
    }
    
    /**
     * Get the data of this login user 
     */
    refreshUserData = () => {
        signInAPI.getUserData(signInAPI.username).then(d => {
            const {username , password , role} = d;
            this.setState({username , password , role})
        })
    }

    /**
     * Delete this login user 
     */
    delete = () => signInAPI.removeUser().then(_=>this.logout);

    /**
     * Return users list button when the user role is admin
     * @returns {Component}
     */
    showUserListBtn = () => {
        const {role} = this.state;
        if(role === "admin"){
            return <button onClick={this.getUserlist}>管理會員</button>
        }
    }

    /**
     * Return specified component
     * @returns {Component}
     */
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
                                        <tr key={uuidv4()}>
                                            <td>{field[0].name}:</td>
                                            <td>{this.state[field[0].className]}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <button onClick={this.getReset}>修改密碼</button>
                        {this.showUserListBtn()}
                        <button className = "btnLogout" 
                                onClick   = {this.logout}>
                                    登出
                        </button>
                        <button className = "btnDelete" 
                                onClick   = {this.delete}>
                                    刪除帳號
                        </button>
                    </div>
                )
            case "reset" :
                return <ResetPw index    = {this.getIndex}/>
            case "userlist" :
                return <UserList index   = {this.getIndex} 
                                 newUser = {this.getNew}/>
            case "new" :
                return <NewUser userList = {this.getUserlist}/>
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
