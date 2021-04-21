import React, { Component } from 'react'
import ContainerHeader      from "../../../ContainerHeader"
import Form                 from '../../../Form'
import signInAPI            from "../../../../signInAPI"
import './index.css'

export default class ResetPw extends Component {
    
    /**
     * Event for submit button
     * @param {Object} data 
     */
    submit = data => {
        const {index} = this.props;
        signInAPI.updatePassword(data.newPassword).then(_=>index())
    }

    render() {
        const {index} = this.props;
        let formField = [{
            type    : "text",
            label   : "新密碼",
            name    : "newPassword"
        }]

        return (
            <div className="ResetPasswordContainer">
                <ContainerHeader backPage={index}/>
                <Form field  = {formField}
                      submit = {this.submit} />
            </div>
        )
    }
}
