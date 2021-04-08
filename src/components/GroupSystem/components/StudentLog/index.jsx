import React, { Component } from 'react'
import './index.css'
import Table from '../../../Table'
import ContainerHeader from '../../../ContainerHeader'
import signInAPI from '../../../../signInAPI'

export default class StudentLog extends Component {
    
    state = {record:[]}

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
    }

    render() {
        return (    
            <div className="MyLogContainer">
                <ContainerHeader backPage={this.props.back}/>
                <div className="MyLogTableWrap">
                    <Table rowData={signInAPI.getPersonalLogRowData()} 
                           fields={signInAPI.getPersonalLogHeadFields()} 
                           className="PersonalLogTable"/>
                </div>
                <div className="MyLogTotalWrap">
                    {
                        this.state.record.map(obj => (
                            <div className={obj["name"]}>
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
