import React, { Component } from 'react'
import { v4 as uuidv4 }     from 'uuid';
import ContainerHeader      from '../../../ContainerHeader'
import Table                from '../../../Table'
import signInAPI            from '../../../../signInAPI'
import './index.css'


export default class StudentLog extends Component {
    
    state = {
        /**
         * Save total data for normal and special class
         */
        record : [],

        /**
         * Save log row data
         */
        log    : []
    }

    componentDidMount = () => {
        const {data} = this.props
        this.refreshLogData(data["normalNum"] , data["specialNum"]);
    }

    /**
     * Delete log event
     * @param {String} id student id
     * @param {String} type class type which was delete
     */
    deleteLog = (id , type) => {
        signInAPI.removePersonalLog(id);

        const {data : oldData} = this.props

        let normalNum  = type === "一般" ? oldData.normalNum - 1   : oldData.normalNum;
        let specialNum = type === "特殊" ? oldData.specialNum - 1  : oldData.specialNum;
        let newData    = {
            ...oldData , 
            normalNum , 
            specialNum
        }

        signInAPI.updateStudent(oldData , newData)

        this.refreshLogData(normalNum , specialNum);
        
    }

    /**
     * Get new recode data and row data of log
     * @param {Number} normalNum the total number of normal classes
     * @param {Number} specialNum the total number of special classes
     */
    refreshLogData = (normalNum , specialNum) => {
        const {data} = this.props

        signInAPI.getPersonalLogRowData(data.id).then(log => this.setState({log}));
        this.setState({record:[{
            name  : "normal",
            label : "一般點名",
            time  : normalNum
        },{
            name  : "special",
            label : "特殊點名",
            time  : specialNum
        },{
            name  : "total",
            label : "總點名",
            time  : normalNum + specialNum
        }]})
    }

    render() {
        return (    
            <div className="MyLogContainer">
                <ContainerHeader backPage = {this.props.back}/>
                <div className="MyLogTableWrap">
                    <Table rowData   = {this.state.log}
                           deleteLog = {this.deleteLog}
                           fields    = {signInAPI.getPersonalLogHeadFields()} 
                           className = "PersonalLogTable"/>
                </div>
                <div className="MyLogTotalWrap">
                    {
                        this.state.record.map(item => (
                            <div className  = {item["name"]} 
                                 key        = {uuidv4()}>
                                <p>{item["label"]}</p>
                                <p>{item["time"]}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}
