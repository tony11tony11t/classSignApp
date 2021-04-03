import React, { Component } from 'react'
import ClassroomList from './components/ClassroomList'
import ClassList from './components/ClassList'
import DatePicker from '../DatePicker'
import StudentList from './components/StudentList'
import './index.css'

export default class SignInSystem extends Component {

    state = {
        showDatePicker : false,
        showClassroomList : false,
        showClassType : false,
        showStudent : false,
        myOptions:{
            classroom:null,
            group:null,
            students:null,
            classType:null,
            date:{
                year:null,
                month:null,
                day:null
            }
        }
    }
    constructor(props){
        super(props);
        //當組件建置時將時間設定成本地的今天
        let date = new Date();
        
        this.state = {
            ...this.state,
            myOptions:{
                ...this.state.myOptions,
                date:{
                    year    : date.getFullYear(),
                    month   : date.getMonth() + 1,
                    day     : date.getDate()
                }
            }
        };
    }

    getDate = date => this.setState({myOptions:{...this.state.myOptions , date}});

    getClassroom = classroom => {
        this.setState({myOptions:{...this.state.myOptions , classroom , classType:null}});
        this.handleSelectClassroom();
    }
    
    getClass = classType => {
        this.setState({myOptions:{...this.state.myOptions , classType}});
        this.handleSelectClass();
    }
    
    getStudents = student => {
        const {myOptions} = this.state;
        const {students} = myOptions;
        if(students){
            let listStudent = [...students].find(s => s.id == student.id)
            if(listStudent){
                students.delete(listStudent);
                if(students.size == 0){
                    this.setState({myOptions:{...myOptions , students:null}});
                    return;
                }
            }else{
                students.add(student);
            }
            this.setState({myOptions:{...myOptions , students}});
        }else{
            this.setState({myOptions:{...myOptions , students:new Set([student])}});
        }
    }

    handleSelectDate = () => this.setState({showDatePicker : !this.state.showDatePicker});
    handleSelectClassroom = () => this.setState({showClassroomList : !this.state.showClassroomList});
    handleSelectClass = () => this.setState({showClassType : !this.state.showClassType});
    handleSelectStudent = () => this.setState({showStudent : !this.state.showStudent});

    handleSubmit = () => {
        const {date,classroom,classType,students} = this.state.myOptions;
        console.log("點名成功");
    }
    
    isFinish = type => this.state.myOptions[type] ? 'finish' : '';

    showStudentList = students => [...students].map(student =>(
                                <>
                                    {`${student.name}`}
                                    <br/>
                                </>
                            ));
    getSubmitBtn = () => {
        const {date,classroom,classType,students} = this.state.myOptions;
        let attr = {
            type : 'button',
            className : 'submit inactivated',
            onclick : null
        }
        if(date && classroom && classType && students){
            attr = {
                ...attr ,
                className : 'submit',
                onClick : this.handleSubmit
            };
        }
        return <button {...attr}>點名</button>
    }
    

    render() {
        const {date,classroom,classType,students} = this.state.myOptions;
        const {showDatePicker,showClassroomList,showClassType,showStudent} = this.state;
        let classRoomInfo = {
            normal : classroom && classroom.normal,
            special : classroom && classroom.special,
        }
        return (
            <div className='signInContainer'>
                <h3>簽到系統</h3>
                <div className='signInWrap'>
                    <form>
                        <div className='signInFormWrap'>
                            <button className={this.isFinish('date')} type='button' onClick={this.handleSelectDate}>
                                {`${date.year}-${date.month}-${date.day}`}
                            </button>
                            {showDatePicker ? 
                                <DatePicker fnGetDate={this.getDate} 
                                            date={date}/> 
                                : null
                            }

                            <button className={this.isFinish('classroom')} type='button' onClick={this.handleSelectClassroom}>
                                {classroom ? classroom.name : '選擇教室'}
                            </button>
                            {showClassroomList ? 
                                <ClassroomList fnGetClassroom={this.getClassroom} 
                                               selectClassroom={classroom} /> 
                                : null
                            }
                            
                            <button className={`${classroom ? '' : 'inactivated'} ${this.isFinish('classType')}`} type='button' onClick={classroom ? this.handleSelectClass : null}>
                                {classType ? classType : '選擇課程'}
                            </button>
                            {showClassType ? 
                                <ClassList {...classRoomInfo}
                                           fnGetClass = {this.getClass} 
                                           selectClassType = {classType} /> 
                                : null
                            }
                            
                            <button className={this.isFinish('students')} type='button' onClick={this.handleSelectStudent}>
                                {students ? this.showStudentList(students) : '選擇學員'}
                            </button>
                            {showStudent ? 
                                <StudentList fnGetStudents = {this.getStudents} 
                                             selectStudent = {students} />
                                : null
                            }
                        </div>
                        {this.getSubmitBtn()}
                    </form>
                </div>
            </div>
        )
    }
}
