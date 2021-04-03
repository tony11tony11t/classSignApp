import React, { Component } from 'react'
import LogTable from './components/LogTable'
import './index.css'

export default class LogSystem extends Component {
    render() {
        return (
            <div className='LogContainer'>
                <h3>點名紀錄</h3>
                <div className='LogWrap'>
                    <LogTable />
                </div>
            </div>
        )
    }
}
