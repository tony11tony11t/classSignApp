import React, { Component } from 'react'
import Table                from '../Table'
import Header               from '../Header'
import signInAPI            from '../../signInAPI'
import './index.css'

export default class LogSystem extends Component {

    state = {
        /**
         * Save log data
         */
        logList : []
    }

    componentDidMount = () => {
        //Loading log data
        signInAPI.getLogRowData().then(logList => this.setState({logList}))
    }

    render() {
        const {logList} = this.state;
        return (
            <div className='LogContainer'>
                <Header title   = "點名紀錄" 
                        name    = "Log"/>
                <div className = 'LogWrap'>
                    <Table rowData   = {logList}
                           fields    = {signInAPI.getLogHeadFields()} 
                           className = "LogTable"/>
                </div>
            </div>
        )
    }
}
