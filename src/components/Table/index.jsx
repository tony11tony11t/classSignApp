import React, { Component } from 'react'
import { v4 as uuidv4 }     from 'uuid';
import TableHead            from './components/TableHead'

import './index.css'

export default class Table extends Component {

    /**
     * Return the divide component
     * @param {String} content divide content of table data
     * @returns {Component}
     */
    showDivide = content => {
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

    /**
     * Return the row data component
     * @param {Object} obj 
     * @returns {Component}
     */
    showRowData = (data) => {
        const {showInfo} = this.props;

        /**
         * Return the click function for table row
         * @returns {Event}
         */
        let onClickEvent = () => {
            if(showInfo){
                return showInfo.bind(this , data["id"] , data["idGroup"])
            }
        }

        return (
            <tr className = {`Row ${showInfo ? "Clickable" : ""}`} 
                onClick   = {onClickEvent()} 
                key       = {uuidv4()}>
            {
                Object.keys(data).map(k => {
                    //if the key has a string which is called "id",not to show
                    if(!k.includes("id")){
                        return <td key = {uuidv4()}>
                                    {this.transfromValue(data[k])}
                                </td>
                    }
                    return null;
                })
            }
            {this.showDeleteBtn(data)}
            </tr>
        )
    }

    /**
     * Change string if it conforms to some condition
     * @param   {String} v data of table row 
     * @returns {String}
     */
    transfromValue = v => {
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

    /**
     * Return delete button when the table has to delete action
     * @param {Object} data table row data
     * @returns {Component}
     */
    showDeleteBtn = data => {
        const {fields , deleteLog} = this.props

        if(fields.find(field => field[0] && field[0].className === "delete")){
            return (
                <td>
                    <img src     = "../img/global_btn_close.png" 
                         alt     = "delete" 
                         onClick = {deleteLog.bind(this , data["id"] , data["type"])}/>
                </td>
            )
        }
    }

    render() {
        const {className , fields , rowData} = this.props
        return (
            <table className = {`Table ${className}`}>
                <TableHead fields = {fields}/>     
                <tbody>
                {
                    rowData.map(obj => {
                        return(
                            <React.Fragment key = {uuidv4()}>
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
