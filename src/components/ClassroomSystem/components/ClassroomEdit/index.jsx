import React, { Component } from 'react'
import signInAPI from '../../../../signInAPI'
import ContainerHeader from '../../../ContainerHeader'
import Form from '../../../Form'
import './index.css'

export default class ClassroomEdit extends Component {
    render() {
        const {back,data} = this.props;
        return (
            <div className="ClassroomFormContainer">
                <ContainerHeader backPage={back}/>
                <Form field={signInAPI.getClassroomFormFields()} data={data} />
            </div>
        )
    }
}
