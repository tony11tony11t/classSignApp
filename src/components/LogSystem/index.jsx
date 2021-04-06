import React, { Component } from 'react'
import Table from '../Table'
import signInAPI from '../../signInAPI'
import Header from '../Header'
import './index.css'

export default class LogSystem extends Component {
    render() {
        const signIn = new signInAPI();
        return (
            <div className='LogContainer'>
                <Header title="點名紀錄" name="Log"/>
                <div className='LogWrap'>
                    <Table rowData={signIn.getLogRowData()} 
                           fields={signIn.getLogHeadFields()} 
                           className="LogTable"/>
                </div>
            </div>
        )
    }
}
