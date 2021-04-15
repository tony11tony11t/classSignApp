import React, { Component } from 'react'
import ContainerHeader from "../../../ContainerHeader"
import Table from '../../../Table'
import signInAPI from "../../../../signInAPI"
import './index.css'

export default class UserList extends Component {
    state = {
        userList : []
    }

    componentDidMount = () => {
        signInAPI.getUserRowData().then(userList => {
            this.setState({userList})
        })
    }

    render() {
        const btn =  {
            className : "btnEdit",
            src : "../img/group_navbar_adduser.png",
            onClick : this.props.new
        }
        const {index} = this.props;
        return (
            <div className="UserlistContainer">
                <ContainerHeader backPage={index} buttons={btn}/>
                <Table rowData    = {this.state.userList} 
                       fields     = {signInAPI.getUserHeadFields()} 
                       className  = "UserTable"/>
            </div>
        )
    }
}
