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
        let onClick = showInfo !== undefined ? showInfo.bind(this,obj["id"],obj["idGroup"]) : null;
        let className = `Row ${showInfo !== undefined ? "Clickable" : ""}`;
        return (
            <tr className = {className} 
                onClick   = {onClick} 
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
