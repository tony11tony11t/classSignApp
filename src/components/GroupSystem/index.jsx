import React, { Component } from 'react'
import './index.css'
import Table from '../Table';
import Search from './components/Search'
import StudentInfo from './components/StudentInfo'
import StudentForm from './components/StudentForm'
import StudentLog from './components/StudentLog'
import signInAPI from '../../signInAPI'
import Header from '../Header'

export default class GroupSystem extends Component {
    
    state = {
        page : "index", // "index" | "info" | "edit" | "log" | "new"
        groupList : [],
        studentData : {}
    }

    componentDidMount = () => {
        signInAPI.getGroupRowData().then(groupList => {
            this.setState({groupList})
        })
    }

    getInfo = (studentID,groupID) => {
        signInAPI.getPage(this , "info");
        if(studentID && groupID){
            signInAPI.getStudentRowDate(studentID,groupID).then(studentData => this.setState({studentData}))
        }
    }
    getIndex = () => signInAPI.getPage(this , "index");

    getEdit = () => signInAPI.getPage(this , "edit");

    getLog = () => signInAPI.getPage(this , "log");

    getNew = () => signInAPI.getPage(this , "new");

    showContent = () => {
        const {page,groupList} = this.state;
        switch(page){
            case "index" : 
                return (
                    <>
                    <Search />
                    <Table  rowData     = {groupList} 
                            fields      = {signInAPI.getGroupHeadFields()} 
                            className   = "GroupTable"
                            showInfo    = {this.getInfo}/>
                    </>
                )
            case "info" :
                return <StudentInfo back     = {this.getIndex} 
                                    showEdit = {this.getEdit} 
                                    showLog  = {this.getLog}
                                    data     = {this.state.studentData}/>
            case "edit" :
                return <StudentForm back={this.getInfo} data={this.state.studentData}/>
            case "new" :
                return <StudentForm back={this.getIndex} data={{}}/>
            case "log" :
                return <StudentLog back={this.getIndex} data={this.state.studentData}/>;
        }
    }

    showBtn = () => {
        const btn = [
            {
                src : "../img/group_navbar_adduser.png",
                className : "addUser",
                onClick : this.getNew
            },{
                src : "../img/group_navbar_money.png",
                className : "money"
            }
        ]
        const {page} = this.state;
        return page == "index" ? btn : null;
    }

    render() {
        
        return (
            <div className='GroupContainer'>
                <Header title="學員管理" name="Group" buttons={this.showBtn()}/>          
                <div className='GroupWrap'>
                    {this.showContent()}
                </div>
            </div>
        )
    }
}
