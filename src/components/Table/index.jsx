import React, { Component } from 'react'
import TableHead from './components/TableHead'
import { v4 as uuidv4 } from 'uuid';

import './index.css'

export default class Table extends Component {
    showDivide = (content) => {
        if(content == null) return;
        
        return (
            <tr key = {uuidv4()}>
                <td  colSpan     = "100%" 
                     className   = "DateDivide">
                        {content}
                </td>
            </tr>
        )
    }
    showRowData = (obj) => {
        const {showInfo} = this.props;

        let onClickEvent = () => {
            if(showInfo){
                return showInfo.bind(this,obj["id"],obj["idGroup"])
            }
        }
        return (
            <tr className = {`Row ${showInfo ? "Clickable" : ""}`} 
                onClick   = {onClickEvent()} 
                key       = {uuidv4()}>
            {
                Object.keys(obj).map(k => {
                    if(!k.includes("id")){
                        return <td key = {uuidv4()}>
                                    {this.transfromValue(obj[k])}
                                </td>
                    }
                    return null;
                })
            }
            {this.getDeleteBtn(obj)}
            </tr>
        )
    }

    transfromValue = (v) => {
        if(typeof v === "boolean"){
            return v ? "O" : ""
        }else if(v === "true"){
            return "O"
        }else if(v === "false"){
            return ""
        }else{
            return v
        }
    }

    getDeleteBtn = obj => {
        const {fields,deleteLog} = this.props
        if(fields.find(field => field[0] && field[0].className === "delete")){
            return (
                <td>
                    <img src     = "../img/global_btn_close.png" 
                         alt     = "delete" 
                         onClick = {deleteLog.bind(this,obj["id"],obj["type"])}/>
                </td>
            )
        }
    }

    render() {
        const {className , fields , rowData} = this.props
        return (
            <table className = {`Table ${className}`} key = {uuidv4()}>
                <TableHead fields={fields} key = {uuidv4()}/>
                <tbody key = {uuidv4()}>
                {
                    rowData.map(obj => {
                        return(
                            <React.Fragment key={uuidv4()}>
                                {this.showDivide(obj["content"])}
                                {obj["data"].map(data => this.showRowData(data))}
                            </React.Fragment>
                        )
                    })
                }
                </tbody>
            </table>
        )
    }
}
