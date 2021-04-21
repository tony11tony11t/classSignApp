import React, { Component } from 'react'
import Search               from './components/Search'
import StudentInfo          from './components/StudentInfo'
import StudentForm          from './components/StudentForm'
import StudentLog           from './components/StudentLog'
import Table                from '../Table'
import Header               from '../Header'
import signInAPI            from '../../signInAPI'
import './index.css'

export default class GroupSystem extends Component {
    
    state = {
         /**
         * Decide which component will be shown
         */
        page        : "index", // "index" | "info" | "edit" | "log" | "new"

        /**
         * Save group list
         */
        groupList   : [],

        /**
         * Save specified student data
         */
        studentData : {},

        /**
         * Save specified student id
         */
        studentID   : null,

        /**
         * Save specified group id
         */
        groupID     : null
    }

    componentDidMount = () => {
        //Loading group data
        signInAPI.getGroupRowData().then(groupList => {
            this.setState({groupList})
        })
    }

    /**
     * Set the student data for the state and change to information page
     * @param {String} studentID 
     * @param {String} groupID 
     */
    getInfo = (studentID , groupID) => {
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

    /**
     * Change to index and reload group data
     */
    getIndex = () => {
        signInAPI.getGroupRowData().then(groupList => {
            this.updateGroupList(groupList);
            signInAPI.getPage(this , "index")
        })
    };

    /**
     * Change to edit page
     */
    getEdit = () => signInAPI.getPage(this , "edit");

    /**
     * Change to log page 
     */
    getLog  = () => signInAPI.getPage(this , "log" );

    /**
     * Change to new page 
     */
    getNew  = () => signInAPI.getPage(this , "new" );

    /**
     * Update all students money field in information
     */
    updateMoney = () => signInAPI.updateAllStudentMoney().then(_ => this.getIndex());

    /**
     * Update group list for the state
     * @param {Object} groupList 
     */
    updateGroupList = groupList => this.setState({groupList})

    /**
     * Return specified component
     * @returns {Component}
     */
    showContent = () => {
        const {page , groupList , studentData} = this.state;

        switch(page){
            case "index" : 
                return (
                    <>
                    <Search search      = {this.updateGroupList}/>
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
                return <StudentForm back     = {this.getInfo} 
                                    index    = {this.getIndex} 
                                    data     = {studentData}/>
            case "new" :
                return <StudentForm back     = {this.getIndex} 
                                    data     = {{}}/>
            case "log" :
                return <StudentLog back      = {this.getInfo} 
                                   data      = {studentData}/>;
            default : break;
        }
    }

    /**
     * Return buttons information
     * @returns {Object}
     */
    getBtn = () => {
        const {page} = this.state;
        const btn    = [
            {
                src         : "../img/group_navbar_adduser.png",
                className   : "addUser",
                onClick     : this.getNew
            },{
                src         : "../img/group_navbar_money.png",
                className   : "money",
                onClick     : this.updateMoney
            }
        ]
        return page === "index" ? btn : null;
    }

    render() {
        return (
            <div className='GroupContainer'>
                <Header title   = "學員管理" 
                        name    = "Group" 
                        buttons = {this.getBtn()}/>
                <div className  = 'GroupWrap'>
                    {this.showContent()}
                </div>
            </div>
        )
    }
}
