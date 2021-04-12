import React, { Component } from 'react'
import signInAPI from '../../../../signInAPI'
import ContainerHeader from '../../../ContainerHeader'
import { v4 as uuidv4 } from 'uuid';
import './index.css'

export default class StudentInfo extends Component {

    getInfo = () => {
        const {data} = this.props
        return signInAPI.getPersonalHeadFields().map(label => (
            <tr key={uuidv4()}>
                <td className={`label ${label["name"]}`}>{label["label"]}</td>
                <td>{this.transfromValue(data[label["name"]])}</td>
            </tr>
        ));
    }

    transfromValue = (v) => {
        //如果是boolean值
        if(typeof v === "boolean"){
            return v ? "是" : "否"
        }else if(v === "true"){
            return "是"
        }else if(v === "false"){
            return "否"
        }

        //如果是object，抓name值
        if(typeof v === "object"){
            return v.name
        }

        return v
    }

    render() {
        const btn =  {
            className : "btnEdit",
            src : "../img/edit.png",
            onClick : this.props.showEdit
        }
        return (
            <div className="StudentInfoContainer">
                <ContainerHeader buttons={btn} backPage={this.props.back}/>
                <div className="StudentInfoBody">
                    <table>
                        <tbody>
                            {this.getInfo()}
                        </tbody>
                    </table>
                    <button className="signInLog" onClick={this.props.showLog}>查看點名紀錄</button>
                </div>
            </div>
        )
    }
}
