import React, { Component } from 'react'
import ContainerHeader      from "../../../ContainerHeader"
import Table                from '../../../Table'
import signInAPI            from "../../../../signInAPI"
import './index.css'

export default class UserList extends Component {
    state = {
        /**
         * Save user data
         */
        userList : []
    }

    componentDidMount = () => {
        //Loading user data
        signInAPI.getUserRowData().then(userList => {
            this.setState({userList})
        })
    }

    render() {
        const {index , newUser} = this.props;
        const btn =  {
            className   : "btnEdit",
            src         : "../img/group_navbar_adduser.png",
            onClick     : newUser
        }


        return (
            <div className="UserlistContainer">
                <ContainerHeader backPage  = {index} 
                                 buttons   = {btn}/>
                <Table rowData    = {this.state.userList} 
                       fields     = {signInAPI.getUserHeadFields()} 
                       className  = "UserTable"/>
            </div>
        )
    }
}
