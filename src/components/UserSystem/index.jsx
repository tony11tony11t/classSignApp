import React, { Component } from 'react'
import UserInfo from './components/UserInfo'
import Header from '../Header'
import ContainerHeader from "../ContainerHeader"
import Form from '../Form'
import Table from '../Table'
import './index.css'
import signInAPI from '../../signInAPI'

export default class UserSystem extends Component {

    state = {
        page : "index" // "index" | "reset" | "userlist"
    }
    getReset = () => this.setState({page:"reset"})
    
    getIndex = () => this.setState({page:"index"});

    getUserlist = () => this.setState({page:"userlist"});

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
                    label : "新密碼"
                }]
                return (
                    <div className="ResetPasswordContainer">
                        <ContainerHeader backPage={this.getIndex}/>
                        <Form field={formField} />
                    </div>
                )
            case "userlist" :
                const signIn = new signInAPI();
                return (
                    <div className="UserlistContainer">
                        <ContainerHeader backPage={this.getIndex}/>
                        <Table rowData={signIn.getUserRowData()} 
                            fields={signIn.getUserHeadFields()} 
                            className="UserTable"/>
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
