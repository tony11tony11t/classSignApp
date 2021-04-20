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
        studentData : {},
        studentID : null,
        groupID : null
    }

    componentDidMount = () => {
        signInAPI.getGroupRowData().then(groupList => {
            this.setState({groupList})
        })
    }

    getInfo = (studentID,groupID) => {
        
        if(typeof studentID === "string" && typeof groupID === "string"){
            this.setState({studentID , groupID});
        }else{
            studentID = null;
            groupID   = null;
        }

        let NowStudentID = studentID || this.state.studentID;
        let NowGroupID   = groupID   || this.state.groupID;

        signInAPI.getStudentDate(NowStudentID,NowGroupID).then(studentData => {
            const {group} = studentData
            studentData.group = {
                id   : NowGroupID,
                name : group
            }
            this.setState({studentData});
            signInAPI.getPage(this , "info");
        })
        
    }

    getIndex = () => {
        signInAPI.getGroupRowData().then(groupList => {
            this.setState({groupList})
            signInAPI.getPage(this , "index")
        })
    };

    getEdit = () => signInAPI.getPage(this , "edit");
    getLog  = () => signInAPI.getPage(this , "log" );
    getNew  = () => signInAPI.getPage(this , "new" );

    updateMoney = () => {
        signInAPI.updateAllStudentMoney().then(_ => this.getIndex());
    }

    updateGroupList = groupList => this.setState({groupList})

    showContent = () => {
        const {page , groupList , studentData} = this.state;

        switch(page){
            case "index" : 
                return (
                    <>
                    <Search search={this.updateGroupList}/>
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
                                    data     = {studentData}/>
            case "edit" :
                return <StudentForm back={this.getInfo} index={this.getIndex} data={studentData}/>
            case "new" :
                return <StudentForm back={this.getIndex} data={{}}/>
            case "log" :
                return <StudentLog back={this.getInfo} data={studentData}/>;
            default : break;
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
                className : "money",
                onClick : this.updateMoney
            }
        ]
        const {page} = this.state;
        return page === "index" ? btn : null;
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
