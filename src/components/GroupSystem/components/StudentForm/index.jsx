import React, { Component } from 'react'
import signInAPI from '../../../../signInAPI'
import ContainerHeader from '../../../ContainerHeader'
import Form from '../../../Form'
import './index.css'

export default class StudentForm extends Component {

    submit = (data) => {
        let dataObj = {
            name         : data.name ,
            startDate    : `${data.year}-${data.month}-${data.day}` ,
            group        : data.group.name ,
            introducer   : data.introducer ,
            relationship : data.relationship ,
            city         : data.city ,
            career       : data.career ,
            money        : data.money ,
            reason       : data.reason
        }
        signInAPI.postStudent(dataObj).then(_ => this.props.back());
    }

    render() {
        const {back,data} = this.props;
        return (
            <div className="StudentFormContainer">
                <ContainerHeader backPage={back}/>
                <Form field={signInAPI.getGroupFormFields()} 
                      data={data}
                      submit={this.submit}/>
            </div>
        )
    }
}
