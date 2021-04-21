import React, { Component } from 'react'
import ContainerHeader      from '../../../ContainerHeader'
import Form                 from '../../../Form'
import signInAPI            from '../../../../signInAPI'
import './index.css'

export default class StudentForm extends Component {

    /**
     * submit event for submit button 
     * @param {Object} newData Form data that user write
     */
    submit = (newData) => {
        newData = {...newData};

        const {data} = this.props;
        const {id : studentId} = newData;
        const {id : groupId} = newData.group;

        if(Object.keys(data).length){
            signInAPI.updateStudent(newData,data)
                     .then(newGroupId => {
                        this.props.back(studentId , newGroupId || groupId)
                     });
        }else{
            signInAPI.postStudent(newData).then(_ => this.props.back());
        }
    }

    /**
     * remove student data
     * @param {String} studentId student id
     * @param {String} groupId group id
     */
    remove = (studentId,groupId) => {
        signInAPI.removeStudent(studentId , groupId).then(_ => this.props.index());
    }

    render() {
        const {back , data} = this.props;
        return (
            <div className="StudentFormContainer">
                <ContainerHeader backPage={back}/>
                <Form field     = {signInAPI.getGroupFormFields()} 
                      data      = {data}
                      submit    = {this.submit}
                      subject   = "student"
                      remove    = {Object.keys(data).length ? this.remove : null}/>
            </div>
        )
    }
}
