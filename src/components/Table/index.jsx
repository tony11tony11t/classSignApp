import React, { Component } from 'react'
import TableHead from './components/TableHead'
import './index.css'

export default class Table extends Component {
    showDivide = (content) => {
        if(content == null) return;
        
        let dataLength = Object.keys(this.props.rowData[0].data[0]).filter(k => !k.includes("id")).length;
        return (
            <tr>
                <td colSpan={dataLength} className="DateDivide">{content}</td>
            </tr>
        )
    }
    showRowData = (obj) => {
        const {showInfo} = this.props;
        let onClick = showInfo != undefined ? showInfo.bind(this,obj["id"],obj["idGroup"]) : null;
        let className = `Row ${showInfo != undefined ? "Clickable" : ""}`;
        return (
            <tr className={className} onClick={onClick}>
            {
                Object.keys(obj).map(k => {
                    if(!k.includes("id")){
                        return <td key={`${obj["id"]}_${k}`}>{this.transfromValue(obj[k])}</td>
                    }
                        
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
        return (
            <table className={`Table ${this.props.className}`}>
                <TableHead fields={this.props.fields} />
                <tbody>
                {
                    this.props.rowData.map(obj => {
                        return(
                            <>
                            {this.showDivide(obj["content"])}
                            {obj["data"].map(data => this.showRowData(data))}
                            </>
                        )
                    })
                }
                </tbody>
            </table>
        )
    }
}
