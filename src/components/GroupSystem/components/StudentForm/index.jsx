import React, { Component } from 'react'
import signInAPI from '../../../../signInAPI'
import ContainerHeader from '../../../ContainerHeader'
import Form from '../../../Form'
import './index.css'

export default class StudentForm extends Component {

    submit = (newData) => {
        newData = {...newData};
        
        const {year,month,day} = newData;
        newData.startDate = `${year}-${month}-${day}`
        delete newData.year;
        delete newData.month;
        delete newData.day;

        const {data} = this.props;
        const {id : studentId} = newData;
        const {id : groupId} = newData.group;
        if(Object.keys(data).length){
            signInAPI.updateStudent(newData,data)
                     .then(_ => this.props.back(studentId,groupId));
        }else{
            signInAPI.postStudent(newData).then(_ => this.props.back());
        }
    }

    remove = (studentId,groupId) => {
        signInAPI.removeStudent(studentId,groupId).then(_ => this.props.index());
    }

    render() {
        const {back,data} = this.props;
        return (
            <div className="StudentFormContainer">
                <ContainerHeader backPage={back}/>
                <Form field     = {signInAPI.getGroupFormFields()} 
                      data      = {data}
                      submit    = {this.submit}
                      remove    = {Object.keys(data).length ? this.remove : null}/>
            </div>
        )
    }
}
