import React, { Component } from 'react'
import Table from '../Table'
import signInAPI from '../../signInAPI'
import './index.css'

export default class LogSystem extends Component {
    render() {
        const signIn = new signInAPI();
        return (
            <div className='LogContainer'>
                <h3>點名紀錄</h3>
                <div className='LogWrap'>
                    <Table rowData={signIn.getLogRowData()} 
                           fields={signIn.getLogHeadFields()} 
                           className="LogTable"/>
                </div>
            </div>
        )
    }
}
