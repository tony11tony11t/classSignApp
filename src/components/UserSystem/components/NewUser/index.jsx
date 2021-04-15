import React, { Component } from 'react'
import ContainerHeader from "../../../ContainerHeader"
import Form from '../../../Form'
import signInAPI from "../../../../signInAPI"
import './index.css'

export default class NewUser extends Component {

    submit = data => {
        const {userList} = this.props;
        signInAPI.postUser(data).then(_ =>userList());
    }

    render() {
        const {userList} = this.props;
        return (
            <div className="NewUserContainer">
                <ContainerHeader backPage={userList}/>
                <Form field  = {signInAPI.getUserFormFields()}
                      submit = {this.submit} />
            </div>
        )
    }
}
