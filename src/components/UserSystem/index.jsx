import React, { Component } from 'react'
import UserTable from './components/UserTable'
import './index.css'

export default class UserSystem extends Component {

    render() {
        return (
            <div className='UserContainer'>
                <h3>個人資訊</h3>
                <div className='UserWrap'>
                    <UserTable showClassroom={this.showClassroom}/>
                    <button >修改密碼</button>
                    <button >管理會員</button>
                    <button className="btnLogout">登出</button>
                </div>
            </div>
        )
    }
}
