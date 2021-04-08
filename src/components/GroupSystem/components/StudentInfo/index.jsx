import React, { Component } from 'react'
import signInAPI from '../../../../signInAPI'
import ContainerHeader from '../../../ContainerHeader'
import './index.css'

export default class StudentInfo extends Component {

    getInfo = () => {
        const {data} = this.props
        return signInAPI.getPersonalHeadFields().map(label => (
            <tr>
                <td className={`label ${label["name"]}`}>{label["label"]}</td>
                <td>{this.transfromValue(data[label["name"]])}</td>
            </tr>
        ));
    }

    transfromValue = (v) => {
        if(typeof v === "boolean"){
            return v ? "是" : "否"
        }else{
            return v
        }
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
                    <table border="0" cellspacing="0" cellpadding="0">
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
