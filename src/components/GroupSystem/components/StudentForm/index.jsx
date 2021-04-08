import React, { Component } from 'react'
import signInAPI from '../../../../signInAPI'
import ContainerHeader from '../../../ContainerHeader'
import Form from '../../../Form'
import './index.css'

export default class StudentForm extends Component {

    render() {
        const {back,data} = this.props;
        return (
            <div className="StudentFormContainer">
                <ContainerHeader backPage={back}/>
                <Form field={signInAPI.getGroupFormFields()} data={data}/>
            </div>
        )
    }
}
