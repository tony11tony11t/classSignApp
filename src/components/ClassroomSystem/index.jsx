import React, { Component } from 'react'
import ClassroomEdit        from './components/ClassroomEdit'
import Table                from '../Table';
import Header               from '../Header'
import signInAPI            from '../../signInAPI'
import './index.css'

export default class ClassroomSystem extends Component {

    state = {
        /**
         * Decide which component will be shown
         */
        page          : "index", //"index" | "edit"

        /**
         * Save classroom list
         */
        classroomList : [],

        /**
         * Save specified classroom information
         */
        classroom     : {}
    }

    componentDidMount = () => {
        //Loading classroom list
        signInAPI.getClassroomsRowData().then(classroomList => {
            this.setState({classroomList})
        })
    }

    /**
     * Change to edit page
     * @param {String} id 
     */
    getEdit = id => {
        if(id){
            signInAPI.getClassroomData(id).then(classroom =>{
                this.setState({
                    classroom , 
                    page    : "edit"
                });
            });
        }else{
            this.setState({
                classroom   : {},
                page        : "edit"
            });
        }
    }

    /**
     * Change to index
     */
    getIndex = () => {
        signInAPI.getClassroomsRowData().then(classroomList => {
            this.setState({classroomList , page : "index"})
        })
    }

    /**
     * Return specified component
     * @returns {Component}
     */
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

    /**
     * Return buttons information
     */
    getAddBtn = () => {
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
                <Header title   = "教室管理" 
                        name    = "Classroom" 
                        buttons = {this.getAddBtn()}/>
                <div className = 'ClassroomWrap'>
                    {this.showContent()}
                </div>
            </div>
        )
    }
}
