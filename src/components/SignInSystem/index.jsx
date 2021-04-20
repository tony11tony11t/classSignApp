import React, { Component } from 'react'
import ClassroomList        from './components/ClassroomList'
import StudentList          from './components/StudentList'
import ClassList            from './components/ClassList'
import DatePicker           from '../DatePicker'
import Header               from '../Header'
import signInAPI            from '../../signInAPI'
import './index.css'

export default class SignInSystem extends Component {

    state = {
        /**
         * Decide which component will be shown
         */
        show        : null, // "date" | "classroom" | "classType" | "students" | null

        /**
         * Whether or not submit button can submit an event
         */
        submitEvent : true,
        
        /**
         * Save the classroom information which are user choose
         */
        classroom   : null,

        /**
         * Save the students which are user choose
         */
        students    : null,

        /**
         * Save the class type which are user choose
         */
        classType   : null,

        
        /**
         * Save the date which are user choose
         */
        date        : null
    }

    constructor(props){
        super(props);

        //Set today's date for the state when the element construct
        this.state.date = signInAPI.getToday();
    }

    /**
     * Set date for the state
     * @param {String} date date string,the format is {yyyy-mm-dd}
     */
    getDate = date => this.setState({date});

    /**
     * Set classroom information for the state
     * @param {Object} classroom classroom information
     */
    getClassroom = classroom => {
        //When the user resets classroom information, class type and students data will be clear
        this.setState({
            classroom , 
            classType   : null , 
            students    : null
        });

        //Hide the element of classrooms list
        this.showOptions("classroom");
    }
    
    /**
     * Set class type for the state
     * @param {Object} classType class type
     */
    getClassType = classType => {
        //When the user resets class type, students data will be clear
        this.setState({
            classType , 
            students    : null});

        //Hide the element of class types list
        this.showOptions("classType");
    }
    
    /**
     * Set students information for the state
     * @param {Object} student students information
     */
    getStudents = student => {
        let {students} = this.state;

        if(students){
            let selectedStudent = [...students].find(s => s.id === student.id)
            if(selectedStudent){

                students.delete(selectedStudent);

                if(students.size === 0){
                    students = null;
                }
                
            }else{
                students.add(student);
            }
        }else{
            students = new Set([student]);
        }
        this.setState({students});
    }

    /**
     * Change component for the state
     * @param {String} name  component name
     */
    showOptions = name => this.setState({show : this.state.show === name ? null : name});

    /**
     * If the specified type of data has been full,return 'finish' string
     * @param {String} type data type
     * @returns {String} 
     */
    isFinish = type => this.state[type] ? 'finish' : '';

    /**
     * Return the sentence of all student name which has been selected
     * @param {Set} students students list
     * @returns {String}
     */
    showStudentList = students => {
        return [...students].reduce(
            (list , student , i) => 
                `${list}${i === 0 ? "" : ","}${student.name}`,""
        );
    }

    /**
     * Return submit button
     * @returns {Component}
     */
    showSubmitBtn = () => {
        const {date , classroom , classType , students , submitEvent} = this.state;

        let attr = {
            type        : 'button',
            className   : 'submit inactivated',
            onClick     : null
        }

        let handleSubmit = () => {
            this.setState({submitEvent : false})
            signInAPI.postSignInLog(date , classroom , classType , students).then(_ => {
                this.props.changePage("log");
            });
        }

        if(date && classroom && classType && students){
            attr = {
                ...attr,
                className   : 'submit',
                onClick     : submitEvent ? handleSubmit : null
            }
        }

        return <button {...attr}>點名</button>
    }

    /**
     * Ruturn button which can choose specified data
     * @param {String} type data type
     * @param {String} content btton text
     * @param {Boolean | Object} filter Whether or not button has enable condition
     * @returns {Component}
     */
    showFormBtn = (type , content , filter = false) => {

        let attr = {
            className  : this.isFinish(type),
            type       : 'button',
            onClick    : this.showOptions.bind(this , type)
        }

        if(filter){
            attr = {
                ...attr,
                className : `${filter ? '' : 'inactivated'} ${this.isFinish(type)}`,
                onClick   : filter ? this.showOptions.bind(this , type) : null
            }
        }

        return <button {...attr}>{content}</button>
    }

    /**
     * Return specified component
     * @param {String} type data type
     * @returns {Component}
     */
    showOptionList = type => {
        const {show} = this.state;

        if(show !== type)   return;

        const {date , classroom , classType , students} = this.state;

        switch(show){
            case "date":
                return <DatePicker      getDate       = {this.getDate} 
                                        date          = {date} />
            case "classroom":
                return <ClassroomList   getClassroom  = {this.getClassroom} 
                                        markClassroom = {classroom} />
            case "classType":
                return <ClassList       getClassType  = {this.getClassType} 
                                        markClassType = {classType}
                                        normal        = {classroom.normal}
                                        special       = {classroom.special} /> 
            case "students":
                return <StudentList     getStudents   = {this.getStudents} 
                                        markStudents  = {students}
                                        classType     = {classType} />
            default:break;
        }
    }
    
    render() {
        
        const {date , classroom , classType , students} = this.state;

        return (
            <div className='signInContainer'>
                <Header title="點名系統" name="SignIn"/>
                <div className='signInWrap'>
                    <form>
                        <div className='signInFormWrap'>
                            {this.showFormBtn("date" , date)}
                            {this.showOptionList("date")}

                            {this.showFormBtn("classroom" , classroom ? classroom.name : '選擇教室')}
                            {this.showOptionList("classroom")}

                            {this.showFormBtn("classType" , classType ? classType : '選擇課程' , classroom)}
                            {this.showOptionList("classType")}
                            
                            {this.showFormBtn("students" , students ? this.showStudentList(students) : '選擇學員' , classType)}
                            {this.showOptionList("students")}
                        </div>
                        {this.showSubmitBtn()}
                    </form>
                </div>
            </div>
        )
    }
}
