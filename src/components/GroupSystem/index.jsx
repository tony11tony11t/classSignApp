import React, { Component } from 'react'
import './index.css'
import StudentTable from './components/StudentsTable'

export default class GroupSystem extends Component {
    render() {
        return (
            <div className='GroupContainer'>
                <h3>學員管理</h3>
                <div className='GroupWrap'>
                    <StudentTable />
                </div>
            </div>
        )
    }
}
