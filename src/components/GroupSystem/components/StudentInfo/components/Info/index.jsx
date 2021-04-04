import React, { Component } from 'react'
import './index.css';

export default class Info extends Component {

    obj = {
        name : "王大明",
        startDate : "2019-03-22",
        group : "第一組",
        introducer : "哇哈哈",
        relationship : "板橋",
        city : "板橋市",
        career : "職業",
        payMoney : "否",
        reason : "哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼",
    }

    getInfo = (obj) => {
        let label = ["姓名","入會時間","組別","介紹人","關係","居住地","工作","使用付費教室","入會原因"];
        let labelID = ["name","startDate","group","introducer","relationship","city","career","payMoney","reason"];
        return labelID.map((id,i) => (
            <tr>
                <td className="label">{label[i]}</td>
                <td>{obj[id]}</td>
            </tr>
        ));
    }

    handleClickLog = () => this.props.showLog();

    render() {
        return (
            <div className="Info">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tbody>
                        {this.getInfo(this.obj)}
                    </tbody>
                </table>
                <button className="signInLog" onClick={this.handleClickLog}>查看點名紀錄</button>
            </div>
        )
    }
}
