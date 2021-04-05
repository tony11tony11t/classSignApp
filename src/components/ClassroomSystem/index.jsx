import React, { Component } from 'react'
import Table from '../Table';
import ClassroomInfo from './components/ClassroomInfo'
import signInAPI from '../../signInAPI'
import './index.css'

export default class ClassroomSystem extends Component {

    state = {
        pageClassroomInfo:false
    }

    showClassroom = (id) => {
        this.setState({pageClassroomInfo:true});
    }

    showIndex = () => {
        this.setState({pageClassroomInfo:false});
    }

    getContent = () => {
        const signIn = new signInAPI();
        const {pageClassroomInfo} = this.state;
        if(pageClassroomInfo){
            return <ClassroomInfo back={this.showIndex}/>
        }else{
            return <Table rowData={signIn.getClassroomRowData()} 
                          fields={signIn.getClassroomHeadFields()} 
                          className="ClassroomTable"
                          showInfo={this.showClassroom}/>
        }
    }

    showAddBtn = () => {
        const {pageClassroomInfo} = this.state;
        if(!pageClassroomInfo){
            return <img src="../img/add.png" onClick={this.showClassroom}/>
        }
    }

    render() {
        return (
            <div className='ClassroomContainer'>
                <div className="ClassroomHeader">
                    <h3>教室管理</h3>
                    <div class="SubNavbar">
                        {
                            this.showAddBtn()
                        }
                    </div>
                </div>
                <div className='ClassroomWrap'>
                    {
                        this.getContent()
                    }
                </div>
            </div>
        )
    }
}
