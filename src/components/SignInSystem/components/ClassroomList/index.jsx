import React, { Component } from 'react'
import {v4 as uuidv4}       from "uuid"
import signInAPI            from '../../../../signInAPI'
import './index.css'

export default class ClassroomList extends Component {

    state = {
        classrooms : []
    }

    componentDidMount = () => {
        //Loading classrooms list
        signInAPI.getClassroomsRowData().then(list => {
            this.setState({
                classrooms : list[0].data
            })
        })
    }

    /**
     * Return class name for class list component
     * @param   {Object} data classroom information
     * @returns {String}
     */
    getClassName = data => {
        const {markClassroom} = this.props;
        let isMark = () => markClassroom && (markClassroom.id === data.id) ? "mark" : ""
        return `classroom options ${isMark()}`
    }

    render() {
        const {classrooms} = this.state;
        return (
            <ul className='classroomList'>
            {
                classrooms.map( classroom => {
                    const {user}     = classroom;
                    const {username} = signInAPI;
                    
                    //if this classroom is authorized to this user
                    if(user && user.includes(username)){
                        return (
                            <li className = {this.getClassName(classroom)} 
                                onClick   = {this.props.getClassroom.bind(this , classroom)}
                                key       = {uuidv4()}>
                                    {classroom.name}
                            </li>
                        )
                    }
                    return;
                })
            }
            </ul>
        )
    }
}
