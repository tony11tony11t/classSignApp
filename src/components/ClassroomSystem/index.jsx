import React, { Component } from 'react'
import Table from '../Table';
import ClassroomEdit from './components/ClassroomEdit'
import Header from '../Header'
import signInAPI from '../../signInAPI'
import './index.css'

export default class ClassroomSystem extends Component {

    state = {
        page : "index", //"index" | "edit"
        classroomList : [],
        classroom : {}
    }

    componentDidMount = () => {
        signInAPI.getClassroomsRowData().then(classroomList => {
            this.setState({classroomList})
        })
    }

    getEdit = id => {
        if(id){
            signInAPI.getClassroomData(id).then(classroom =>{
                this.setState({classroom , page : "edit"});
            });
        }else{
            this.setState({
                classroom : {},
                page : "edit"
            });
        }
    }

    getIndex = () => {
        signInAPI.getClassroomsRowData().then(classroomList => {
            this.setState({classroomList , page : "index"})
        })
    }

    showContent = () => {
        const {page , classroomList , classroom} = this.state;
        
        switch(page){
            case "index" :
                if(classroomList.length > 0){
                    classroomList[0].data.forEach(info => delete info.user)
                }
                return <Table rowData   = {classroomList} 
                              fields    = {signInAPI.getClassroomHeadFields()} 
                              className = "ClassroomTable"
                              showInfo  = {this.getEdit}/>
            case "edit" :
                return <ClassroomEdit back = {this.getIndex} 
                                      data = {classroom}/>
            default : break;
        }
    }

    showAddBtn = () => {
        const btn = {
            className : "btnAdd",
            src       : "../img/add.png",
            onClick   : this.getEdit.bind(this,null)
        }
        const {page} = this.state;
        return page === "index" ? btn : null;
    }

    render() {
        return (
            <div className='ClassroomContainer'>
                <Header title="教室管理" name="Classroom" buttons={this.showAddBtn()}/>
                <div className='ClassroomWrap'>
                    {this.showContent()}
                </div>
            </div>
        )
    }
}
