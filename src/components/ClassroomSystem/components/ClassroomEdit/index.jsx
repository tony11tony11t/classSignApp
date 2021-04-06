import React, { Component } from 'react'
import signInAPI from '../../../../signInAPI'
import ContainerHeader from '../../../ContainerHeader'
import Form from '../../../Form'
import './index.css'

export default class ClassroomEdit extends Component {
    render() {
        const signIn = new signInAPI();
        return (
            <div className="ClassroomFormContainer">
                <ContainerHeader backPage={this.props.back}/>
                <Form field={signIn.getClassroomFormFields()} />
            </div>
        )
    }
}
