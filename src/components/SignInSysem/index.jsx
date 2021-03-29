import React, { Component } from 'react'
import ClassroomList from '../ClassroomList'
import ClassList from '../ClassList'
import DatePicker from '../DatePicker'
import Item from '../Item'
import './index.css'

export default class SignInSystem extends Component {

    state = {
        students:[
            {id:0,name:'1王小名',group:1},
            {id:1,name:'1王小名',group:1},
            {id:2,name:'1王小名',group:1},
            {id:3,name:'2王小名',group:2},
            {id:4,name:'2王小名',group:2},
            {id:5,name:'2王小名',group:2},
            {id:6,name:'3王小名',group:3},
            {id:7,name:'3王小名',group:3}
        ],
        showDatePicker : false,
        showClassroomList : false,
        showClassType : false,
        myOptions:{
            classroom:null,
            group:null,
            student:null,
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

    getClassroom = classroom => this.setState({myOptions:{...this.state.myOptions , classroom}});
    
    getClass = classType => this.setState({myOptions:{...this.state.myOptions , classType}})

    handleSelectDate = () => this.setState({showDatePicker : !this.state.showDatePicker});

    handleSelectClassRoom = () => this.setState({showClassroomList : !this.state.showClassroomList});
    
    handleSelectClass =() => this.setState({showClassType : !this.state.showClassType});
    
    isFinish = type => this.state.myOptions[type] ? 'finish' : '';

    render() {
        const {date,classroom,classType} = this.state.myOptions;
        const {showDatePicker,showClassroomList,showClassType} = this.state;
        return (
            <div className='signInContainer'>
                <div className='signInWrap'>
                    <h1>簽到系統</h1>
                    
                    <form>
                        <button className={this.isFinish('date')} type='button' onClick={this.handleSelectDate}>{`${date.year}-${date.month}-${date.day}`}</button>
                        {showDatePicker ? <DatePicker fnGetDate={this.getDate} date={date}/> : null}
                        <button className={this.isFinish('classroom')} type='button' onClick={this.handleSelectClassRoom}>{classroom ? classroom.name : '選擇教室'}</button>
                        {showClassroomList ? <ClassroomList fnGetClassroom={this.getClassroom} fnShowClass={this.showClass}/> : null}
                        <button className={`${classroom ? '' : 'inactivated'} ${this.isFinish('classType')}`} type='button' onClick={classroom ? this.handleSelectClass : null}>{classType ? classType : '選擇課程'}</button>
                        {showClassType ? <ClassList fnGetClass={this.getClass} normal={classroom.normal} special={classroom.special}/> : null}
                        <button type='button'>選擇學員</button>
                        <button className='submit'>點名</button>
                    </form>
                </div>
            </div>
        )
    }
}
