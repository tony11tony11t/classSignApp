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
        page : "index" // "index" | "info" | "edit" | "log"
    }

    getInfo = (id) => {
        this.setState({page:"info"});
    }
    getIndex = () => {
        this.setState({page:"index"});
    }
    getEdit = () => {
        this.setState({page:"edit"});
    }
    getLog = () => {
        this.setState({page:"log"});
    }

    showContent = () => {
        const signIn = new signInAPI();
        const {page} = this.state;
        switch(page){
            case "index" : 
                return (
                    <>
                    <Search />
                    <Table rowData={signIn.getGroupRowData()} 
                        fields={signIn.getGroupHeadFields()} 
                        className="GroupTable"
                        showInfo={this.getInfo}/>
                    </>
                )
            case "info" :
                return <StudentInfo back={this.getIndex} showEdit={this.getEdit} showLog={this.getLog}/>
            case "edit" :
                return <StudentForm back={this.getIndex}/>
            case "log" :
                return <StudentLog back={this.getIndex} />;
        }
    }

    render() {
        const btn = [
            {
                src : "../img/group_navbar_adduser.png",
                className : "addUser",
                onClick : this.getEdit
            },{
                src : "../img/group_navbar_money.png",
                className : "money"
            }
        ]
        return (
            <div className='GroupContainer'>
                <Header title="學員管理" name="Group" buttons={btn}/>
                
                <div className='GroupWrap'>
                    {this.showContent()}
                </div>
            </div>
        )
    }
}
