import React, { Component } from 'react'
import './index.css'
import Table from '../Table';
import Search from './components/Search'
import StudentInfo from './components/StudentInfo'
import signInAPI from '../../signInAPI'


export default class GroupSystem extends Component {
    
    state = {
        pageStudentInfo:false
    }

    showStudent = (id) => {
        console.log(id);
        this.setState({pageStudentInfo:true});
    }

    showIndex = () => {
        this.setState({pageStudentInfo:false});
    }

    getContent = () => {
        const signIn = new signInAPI();
        const {pageStudentInfo} = this.state;
        if(pageStudentInfo){
            return <StudentInfo back={this.showIndex}/>
        }else{
            return (
                <>
                <Search />
                <Table rowData={signIn.getGroupRowData()} 
                       fields={signIn.getGroupHeadFields()} 
                       className="GroupTable"
                       showInfo={this.showStudent}/>
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
