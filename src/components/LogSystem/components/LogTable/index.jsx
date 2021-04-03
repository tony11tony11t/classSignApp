import React, { Component } from 'react'
import './index.css'

export default class LogTable extends Component {
    getDateRow = (date) => {
        return (
            <tr>
                <td colSpan="4" className="DateDivide">{date}</td>
            </tr>
        )
    }
    getsignInLog = (classroom,group,name,type) => {
        return (
            <tr className="SignInLog">
                <td>{classroom}</td>
                <td>{group}</td>
                <td>{name}</td>
                <td>{type}</td>
            </tr>
        )
    }
    render() {
        return (
            <table className="LogTable" border="0" cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                        <th>教室</th>
                        <th>組別</th>
                        <th>學生</th>
                        <th>類型</th>
                    </tr>
                </thead>
                <tbody>
                    {this.getDateRow("04/03(六)")}
                    {this.getsignInLog("一號","第一組","唐嘉駿","一般")}
                    {this.getsignInLog("二號","第一組","唐嘉駿","一般")}
                    {this.getsignInLog("三號","第一組","唐嘉駿","一般")}
                    {this.getDateRow("04/02(五)")}
                    {this.getsignInLog("三號","第一組","唐嘉駿","一般")}
                    {this.getsignInLog("三號","第一組","唐嘉駿","一般")}
                    {this.getsignInLog("三號","第一組","唐嘉駿","一般")}
                    {this.getsignInLog("三號","第一組","唐嘉駿","一般")}
                </tbody>
            </table>
        )
    }
}
