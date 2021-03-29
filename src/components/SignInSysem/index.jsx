import React, { Component } from 'react'
import ClassList from '../ClassList'
import DatePicker from '../DatePicker'
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
        myOptions:{
            classroom:null,
            group:null,
            student:null,
            money:null,
            date:{
                year:null,
                month:null,
                day:null
            }
        },
        showDatePicker : false
    }
    constructor(props){
        super(props);
        //當組件建置時將時間設定成本地的今天
        let date = new Date();
        this.state = {
            ...this.state,
            myOptions:{
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
    
    handleSelectDate = () => this.setState({showDatePicker : !this.state.showDatePicker});
    
    isFinish = type => this.state.myOptions[type] ? 'finish' : '';

    render() {
        const {date,classroom} = this.state.myOptions;
        const {showDatePicker} = this.state;
        return (
            <div className='signInContainer'>
                <div className='signInWrap'>
                    <h1>簽到系統</h1>
                    
                    <form>
                        <button className={this.isFinish('date')} type='button' onClick={this.handleSelectDate}>{`${date.year}-${date.month}-${date.day}`}</button>
                        {showDatePicker ? <DatePicker fnGetDate={this.getDate} date={date}/> : null}
                        <button className={this.isFinish('classroom')} type='button'>{classroom ? classroom : '選擇教室'}</button>
                        <ClassList fnGetClassroom={this.getClassroom}/>
                        <button type='button'>選擇課程</button>
                        <button type='button'>選擇學員</button>
                        <button className='submit'>點名</button>
                    </form>
                </div>
            </div>
        )
    }
}
