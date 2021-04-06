import React, { Component } from 'react'
import './index.css'
import Table from '../../../Table'
import ContainerHeader from '../../../ContainerHeader'
import signInAPI from '../../../../signInAPI'

export default class StudentLog extends Component {

    render() {
        const signIn = new signInAPI();
        const record = [{
            name : "total",
            label : "點名次數",
            time : 100
        },{
            name : "normal",
            label : "一般點名",
            time : 100
        },{
            name : "special",
            label : "特殊點名",
            time : 100
        }]
        return (    
            <div className="MyLogContainer">
                <ContainerHeader backPage={this.props.back}/>
                <div className="MyLogTableWrap">
                    <Table rowData={signIn.getPersonalLogRowData()} 
                           fields={signIn.getPersonalLogHeadFields()} 
                           className="PersonalLogTable"/>
                </div>
                <div className="MyLogTotalWrap">
                    {
                        record.map(obj => (
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
