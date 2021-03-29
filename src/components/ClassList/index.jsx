import React, { Component } from 'react'
import Item from '../Item'
import './index.css'

export default class ClassList extends Component {
    state = {
        classrooms:[
            {id:0,name:'11號教室',money:false},
            {id:1,name:'5號教室',money:false},
            {id:2,name:'1號教室',money:true},
            {id:3,name:'18號教室',money:true}
        ]
    }
    handleSelect = (name) => {
        this.props.fnGetClassroom(name);
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
