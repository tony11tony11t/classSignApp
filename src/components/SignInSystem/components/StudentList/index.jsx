import React, { Component } from 'react'
import {v4 as uuidv4}       from "uuid"
import signInAPI            from '../../../../signInAPI'
import './index.css'


export default class StudentList extends Component {

    state = {
        /**
         * Save students list
         */
        students : [],

        /**
         * Which group show students list
         */
        unfoldGroup : null
    }

    componentDidMount = () => {
        //Loading groups and students list
        signInAPI.getGroupRowData().then(students => this.setState({students}))
    }

    /**
     * Whether or not specified group component show
     * @param {Number} i group index
     */
    showStudents = i => this.setState({unfoldGroup : this.state.unfoldGroup === i ? null : i})
    
    /**
     * Return student component
     * @param   {Object} student student data
     * @returns {Component}
     */
    getStudent = student => {
        const {classType , markStudents , getStudents} = this.props;

        /**
         * Return "mark" if this student has been selected
         * @returns {String}
         */
        let isMark = () => {
            if(markStudents){
                if([...markStudents].find(mark => mark.id === student.id)){
                    return "mark"
                }else{
                    return ""
                }
            }
        }

        /**
         * Return "inactivated" if the class is special and student who is not paid money
         * @returns {String}
         */
        let isSpecial = () => {
            if(classType === "特殊" && !student.money){
                return "inactivated"
            }else{
                return ""
            }
        }

        /**
         * Return click event if the class is special and student who has been paid money or the class is normal
         * @returns {Event | null}
         */
        let getClickEvent = () => {
            if(classType === "特殊" && !student.money){
                return null
            }else{
                return getStudents.bind(this,student);
            }
        }

        return (<li className   = {`student options ${isMark()} ${isSpecial()}`}
                    onClick     = {getClickEvent()}
                    key         = {uuidv4()}>
                        {student.name}
                </li>)
    }

    render() {
        const {students , unfoldGroup} = this.state;

        return (
            <ul className='GroupsList'>
            {
                students.map( (group,index) => {
                    return (
                        <li className = "group options" 
                            key       = {uuidv4()}>

                            <span onClick={this.showStudents.bind(this,index)}>
                                {group.content}
                            </span>
                            {
                                unfoldGroup === index ? (
                                    <ul className='StudentsList'>
                                        {group.data.map(student => this.getStudent(student))}
                                    </ul>
                                ) : null
                            }
                        </li>
                    )
                })
            }
            </ul>
        )
    }
}
