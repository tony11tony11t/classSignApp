import React, { Component } from 'react'
import ContainerHeader      from '../../../ContainerHeader'
import Form                 from '../../../Form'
import signInAPI            from '../../../../signInAPI'
import './index.css'

export default class ClassroomEdit extends Component {

    /**
     * submit classroom event for the submit button
     * @param {Object} newData 
     */
    submit = newData => {
        const {back , data} = this.props;

        newData.user = [...newData.user];
        if(Object.keys(data).length){
            signInAPI.updateClassroom(newData).then(_ => back())
        }else{
            signInAPI.postClassroom(newData).then(_ => back())
        }
    }
    
    /**
     * remove classroom event for the remove button
     * @param {String} id 
     */
    remove = id => {
        const {back} = this.props;
        signInAPI.removeClassroom(id).then(_ =>back())
    }

    render() {
        const {back , data} = this.props;
        return (
            <div className="ClassroomFormContainer">
                <ContainerHeader backPage={back}/>
                <Form field     = {signInAPI.getClassroomFormFields()} 
                      data      = {data}
                      submit    = {this.submit}
                      remove    = {Object.keys(data).length ? this.remove : null}
                      subject   = "classroom"/>
            </div>
        )
    }
}
