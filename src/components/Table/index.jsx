import React, { Component } from 'react'
import TableHead from './components/TableHead'
import './index.css'

export default class Table extends Component {
    showDivide = (content) => {
        if(content == null) return;
        
        let dataLength = Object.keys(this.props.rowData[0].data[0]).length - 1;
        return (
            <tr>
                <td colSpan={dataLength} className="DateDivide">{content}</td>
            </tr>
        )
    }
    showRowData = (obj) => {
        const {showInfo} = this.props;
        let onClick = showInfo != undefined ? showInfo.bind(this,obj["id"]) : null;
        let className = `Row ${showInfo != undefined ? "Clickable" : ""}`;
        return (
            <tr className={className} onClick={onClick}>
            {
                Object.keys(obj).map(k => {
                    if(k != "id")
                        return <td>{obj[k]}</td>
                })
            }
            </tr>
        )
    }
    render() {
        return (
            <table className={`Table ${this.props.className}`} border="0" cellspacing="0" cellpadding="0">
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
