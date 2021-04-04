import React, { Component } from 'react'
import './index.css'
import StudentTable from './components/StudentsTable'
import Search from './components/Search'
import StudentInfo from './components/StudentInfo'

export default class GroupSystem extends Component {
    state = {
        pageStudentInfo:false
    }

    showStudent = (id) => {
        this.setState({pageStudentInfo:true});
    }

    showIndex = () => {
        this.setState({pageStudentInfo:false});
    }

    getContent = () => {
        const {pageStudentInfo} = this.state;
        if(pageStudentInfo){
            return <StudentInfo back={this.showIndex}/>
        }else{
            return (
                <>
                <Search />
                <StudentTable showStudent={this.showStudent}/>
                </>
            )
        }
    }

    render() {
        return (
            <div className='GroupContainer'>
                <div className="GroupHeader">
                    <h3>學員管理</h3>
                    <div class="SubNavbar">
                        <img src="../img/group_navbar_adduser.png" />
                        <img src="../img/group_navbar_money.png" />
                    </div>
                </div>
                
                <div className='GroupWrap'>
                    {
                        this.getContent()
                    }
                </div>
            </div>
        )
    }
}
