import React, { Component } from 'react'
import './index.css'
import Table from '../../../Table'
import ContainerHeader from '../../../ContainerHeader'
import signInAPI from '../../../../signInAPI'
import { v4 as uuidv4 } from 'uuid';


export default class StudentLog extends Component {
    
    state = {
        record:[],
        log:[]
    }

    componentDidMount = () => {
        const {data} = this.props
        this.refreshLogData(data["normalNum"] , data["specialNum"]);
    }

    deleteLog = (id,type) => {
        signInAPI.removePersonalLog(id);

        const {data : oldData} = this.props

        let normalNum  = type === "一般" ? oldData.normalNum - 1  : oldData.normalNum;
        let specialNum = type === "特殊" ? oldData.specialNum - 1  : oldData.specialNum;
        let newData    = Object.assign(oldData , {normalNum,specialNum })

        signInAPI.updateStudent(oldData , newData)
        this.refreshLogData(normalNum,specialNum);
        
    }

    refreshLogData = (normalNum,specialNum) => {
        const {data} = this.props
        signInAPI.getPersonalLogRowData(data.id).then(log => this.setState({log}));
        this.setState({record:[{
            name : "normal",
            label : "一般點名",
            time : normalNum
        },{
            name : "special",
            label : "特殊點名",
            time : specialNum
        },{
            name : "total",
            label : "總點名",
            time : normalNum + specialNum
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
                        this.state.record.map(obj => (
                            <div className={obj["name"]} key={uuidv4()}>
                                <p>{obj["label"]}</p>
                                <p>{obj["time"]}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}
