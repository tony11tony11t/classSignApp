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
        this.setState({record:[{
            name : "normal",
            label : "一般點名",
            time : data["normalNum"]
        },{
            name : "special",
            label : "特殊點名",
            time : data["specialNum"]
        },{
            name : "total",
            label : "總點名",
            time : data["normalNum"] + data["specialNum"]
        }]})

        signInAPI.getPersonalLogRowData(data.id).then(log => this.setState({log}));

    }

    render() {
        return (    
            <div className="MyLogContainer">
                <ContainerHeader backPage = {this.props.back}/>
                <div className="MyLogTableWrap">
                    <Table rowData   = {this.state.log} 
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
