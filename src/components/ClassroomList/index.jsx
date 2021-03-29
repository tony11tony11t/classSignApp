import React, { Component } from 'react'
import Item from '../Item'
import './index.css'

export default class ClassroomList extends Component {
    state = {
        classrooms:[
            {id:0,name:'11號教室',money:false,normal:true,special:true},
            {id:1,name:'5號教室',money:false,normal:true,special:false},
            {id:2,name:'1號教室',money:true,normal:true,special:false},
            {id:3,name:'18號教室',money:true,normal:true,special:true}
        ]
    }
    handleSelect = (id) => {
        const {classrooms} = this.state;
        this.props.fnGetClassroom(classrooms.find(classroom => classroom.id == id));
    }

    render() {
        const {classrooms} = this.state;
        return (
            <ul className='signInList'>
            {
                classrooms.map( i => 
                    <Item {...i} fnSelect={this.handleSelect}/>
                )
            }
            </ul>
        )
    }
}
