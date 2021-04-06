import React, { Component } from 'react'
import Table from '../Table';
import ClassroomEdit from './components/ClassroomEdit'
import Header from '../Header'
import signInAPI from '../../signInAPI'
import './index.css'

export default class ClassroomSystem extends Component {

    state = {
        page : "index" //"index" | "edit"
    }

    getEdit = (id) => {
        this.setState({page : "edit"});
    }

    getIndex = () => {
        this.setState({page : "index"});
    }

    showContent = () => {
        const signIn = new signInAPI();
        const {page} = this.state;
        switch(page){
            case "index" :
                return <Table rowData={signIn.getClassroomRowData()} 
                          fields={signIn.getClassroomHeadFields()} 
                          className="ClassroomTable"
                          showInfo={this.getEdit}/>
            case "edit" :
                return <ClassroomEdit back={this.getIndex} />
                
        }
    }

    showAddBtn = () => {
        const btn = {
            className : "btnAdd",
            src : "../img/add.png",
            onClick : this.getEdit
        }
        const {page} = this.state;
        return page == "index" ? btn : null;
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
