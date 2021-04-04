import React, { Component } from 'react'
import './index.css'

export default class Log extends Component {

    getsignInLog = (date,classroom,type) => {
        return (
            <tr className="SignInLog">
                <td>{date}</td>
                <td>{classroom}</td>
                <td>{type}</td>
            </tr>
        )
    }
    render() {
        return (
            <div className="MyLogContainer">
                <div className="MyLogTableWrap">
                    <table className="MyLogTable" border="0" cellspacing="0" cellpadding="0">
                        <thead>
                            <tr>
                                <th>日期</th>
                                <th>教室</th>
                                <th className="type">類型</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getsignInLog("2021/04/04 (六)","一號","一般")}
                            {this.getsignInLog("2021/04/04 (六)","二號","一般")}
                            {this.getsignInLog("2021/04/04 (六)","三號","一般")}
                            {this.getsignInLog("2021/04/04 (六)","三號","一般")}
                            {this.getsignInLog("2021/04/04 (六)","三號","一般")}
                            {this.getsignInLog("2021/04/04 (六)","三號","一般")}
                            {this.getsignInLog("2021/04/04 (六)","三號","一般")}
                            {this.getsignInLog("2021/04/04 (六)","三號","一般")}
                            {this.getsignInLog("2021/04/04 (六)","三號","一般")}
                            {this.getsignInLog("2021/04/04 (六)","三號","一般")}
                            {this.getsignInLog("2021/04/04 (六)","三號","一般")}
                            {this.getsignInLog("2021/04/04 (六)","三號","一般")}
                            {this.getsignInLog("2021/04/04 (六)","三號","一般")}
                            {this.getsignInLog("2021/04/04 (六)","三號","一般")}
                            {this.getsignInLog("2021/04/04 (六)","三號","一般")}
                            {this.getsignInLog("2021/04/04 (六)","三號","一般")}
                            {this.getsignInLog("2021/04/04 (六)","三號","一般")}
                        </tbody>
                    </table>
                </div>
                <div className="MyLogTotalWrap">
                    <div className="total">
                        <p>點名次數</p>
                        <p>1000</p>
                    </div>
                    <div className="normal">
                        <p>一般點名</p>
                        <p>1000</p>
                    </div>
                    <div className="special">
                        <p>特殊點名</p>
                        <p>1000</p>
                    </div>
                </div>
            </div>
        )
    }
}
