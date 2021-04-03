import React, { Component } from 'react'
import './index.css'
import Item from '../Item'

export default class StudentList extends Component {
    state = {
        groups:[
            {id:1,name:"第一組",students:[
                {id:1.000001,name:'1王小名'},
                {id:1.000002,name:'1王小名'},
                {id:1.000003,name:'1王小名'}
            ]},
            {id:2,name:"第二組",students:[
                {id:2.000001,name:'2王小名'},
                {id:2.000002,name:'2王小名'},
                {id:2.000003,name:'2王小名'}
            ]},
            {id:3,name:"第三組",students:[
                {id:3.000001,name:'3王小名'},
                {id:3.000002,name:'3王小名'},
                {id:3.000003,name:'3王小名'}
            ]}
        ],
        ShowStudents:new Set()
    }
    handleSelect = id => {
        const {ShowStudents} = this.state;
        ShowStudents.has(id) ? ShowStudents.delete(id) : ShowStudents.add(id);
        this.setState({ShowStudents});
    }
    handleSelectStudent = id => {
        let groupid = Math.floor(id)
        const {students} = this.state.groups.find(group => group.id == groupid);
        this.props.fnGetStudents(students.find(student => student.id == id))
    }

    isSelect = id => {
        const {selectStudent} = this.props;
        return [...(selectStudent || [])].find(student => student.id == id) ? true : false;
    }
    showStudents = students =>  students.map(student =>
                                    <Item {...student}
                                        type='student' 
                                        selected={this.isSelect(student.id)}  
                                        fnSelect={this.handleSelectStudent} />
                                )
        
    

    render() {
        const {groups,ShowStudents} = this.state;
        return (
            <ul className='signInGroupsList'>
            {
                groups.map(group => (
                    <>
                        <Item type='group' {...group} fnSelect={this.handleSelect}></Item>
                        <ul className='signInStudentsList'>
                            {ShowStudents.has(group.id) ? this.showStudents(group.students) : null}
                        </ul>
                    </>
                ))
            }
            </ul>
        )
    }
}
