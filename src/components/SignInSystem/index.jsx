import React, { Component } from 'react'
import ClassroomList from './components/ClassroomList'
import ClassList from './components/ClassList'
import DatePicker from '../DatePicker'
import StudentList from './components/StudentList'
import Header from '../Header'
import './index.css'
import signInAPI from '../../signInAPI'

export default class SignInSystem extends Component {

    state = {
        show : null, // "DatePicker" | "ClassroomList" | "ClassType" | "Student" | null
        showDatePicker : false,
        showClassroomList : false,
        showClassType : false,
        showStudent : false,
        
        //點名資料儲存
        classroom:null,
        students:null,
        classType:null,
        date:null
    }
    constructor(props){
        super(props);
        //當組件建置時將時間設定成本地的今天
        let date = new Date();
        
        this.state = {
            ...this.state,
            date:{
                year    : date.getFullYear(),
                month   : date.getMonth() + 1,
                day     : date.getDate()
            }
        };
    }

    getDate = date => this.setState(date);

    getClassroom = classroom => {
        this.setState({classroom , classType:null});
        this.showOptions("ClassroomList");
    }
    
    getClassType = classType => {
        this.setState({classType});
        this.showOptions("ClassType");
    }
    
    getStudents = student => {
        let {students} = this.state;
        if(students){
            let listStudent = [...students].find(s => s.id == student.id)
            if(listStudent){
                students.delete(listStudent);
                if(students.size == 0){
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

    showOptions = (name) => this.setState({show : this.state.show === name ? null : name});
    
    isFinish = type => this.state[type] ? 'finish' : '';

    showStudentList = students => 
                        [...students].reduce(
                            (list,student,i) => 
                                `${list}${i == 0 ? "" : ","}${student.name}`,""
                        );

    showSubmitBtn = () => {
        const {date,classroom,classType,students} = this.state;
        let attr = {
            type : 'button',
            className : 'submit inactivated',
            onClick : null
        }
        if(date && classroom && classType && students){
            attr = Object.assign(attr , {
                className : 'submit',
                onClick : this.handleSubmit
            })
        }
        return <button {...attr}>點名</button>
    }

    handleSubmit = () => {
        const {date,classroom,classType,students} = this.state;
        signInAPI.postSignInLog(date,classroom,classType,students);
        this.props.changePage("log");
    }
    

    render() {
        const { show,
                date,
                classroom,
                classType,
                students} = this.state;

        return (
            <div className='signInContainer'>
                <Header title="點名系統" name="SignIn"/>
                <div className='signInWrap'>
                    <form>
                        <div className='signInFormWrap'>
                            <button className   = {this.isFinish('date')} 
                                    type        = 'button' 
                                    onClick     = {this.showOptions.bind(this,"DatePicker")}>
                                {`${date.year}-${date.month}-${date.day}`}
                            </button>
                            {show === "DatePicker" ? 
                                <DatePicker fnGetDate   = {this.getDate} 
                                            date        = {date}/> 
                                : null
                            }

                            <button className   = {this.isFinish('classroom')} 
                                    type        = 'button' 
                                    onClick     = {this.showOptions.bind(this,"ClassroomList")}>
                                {classroom ? classroom.name : '選擇教室'}
                            </button>
                            {show === "ClassroomList" ? 
                                <ClassroomList getClassroom     = {this.getClassroom} 
                                               markClassroom    = {classroom} /> 
                                : null
                            }
                            
                            <button className   = {`${classroom ? '' : 'inactivated'} ${this.isFinish('classType')}`} 
                                    type        = 'button' 
                                    onClick     = {classroom ? this.showOptions.bind(this,"ClassType") : null}>
                                {classType ? classType : '選擇課程'}
                            </button>
                            {show === "ClassType" ? 
                                <ClassList getClassType     = {this.getClassType} 
                                           markClassType    = {classType}
                                           normal           = {classroom.normal}
                                           special          = {classroom.special} /> 
                                : null
                            }
                            
                            <button className   = {this.isFinish('students')} 
                                    type        = 'button' 
                                    onClick     = {this.showOptions.bind(this,"Student")}>
                                {students ? this.showStudentList(students) : '選擇學員'}
                            </button>
                            {show === "Student" ? 
                                <StudentList getStudents  = {this.getStudents} 
                                             markStudents = {students} />
                                : null
                            }
                        </div>
                        {this.showSubmitBtn()}
                    </form>
                </div>
            </div>
        )
    }
}
