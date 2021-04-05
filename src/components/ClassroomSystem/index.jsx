import React, { Component } from 'react'
import ClassroomTable from './components/ClassroomTable'
import ClassroomInfo from './components/ClassroomInfo'
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
        const {pageClassroomInfo} = this.state;
        if(pageClassroomInfo){
            return <ClassroomInfo back={this.showIndex}/>
        }else{
            return <ClassroomTable showClassroom={this.showClassroom}/>
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
                    <h3>學員管理</h3>
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
