import React, { Component } from 'react'
import signInAPI from '../../../../signInAPI'
import ContainerHeader from '../../../ContainerHeader'
import './index.css'

export default class StudentInfo extends Component {

    getInfo = (obj) => {
        const signIn = new signInAPI();
        return signIn.getPersonalHeadFields().map(label => (
            <tr>
                <td className={`label ${label["name"]}`}>{label["label"]}</td>
                <td>{obj[label["name"]]}</td>
            </tr>
        ));
    }

    render() {
        const btn =  {
            className : "btnEdit",
            src : "../img/edit.png",
            onClick : this.props.showEdit
        }
        const signIn = new signInAPI();
        return (
            <div className="StudentInfoContainer">
                <ContainerHeader buttons={btn} backPage={this.props.back}/>
                <div className="StudentInfoBody">
                    <table border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                            {this.getInfo(signIn.getPersonalRowDate())}
                        </tbody>
                    </table>
                    <button className="signInLog" onClick={this.props.showLog}>查看點名紀錄</button>
                </div>
            </div>
        )
    }
}
