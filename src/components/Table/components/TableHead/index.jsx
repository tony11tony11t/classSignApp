import React, { Component } from 'react'
import { v4 as uuidv4 }     from 'uuid';

export default class TableHead extends Component {

    /**
     * Return table fields head to the table 
     * @returns  {Array}
     */
    showField = () => {
        const {fields}  = this.props;
        let fieldsDepth = Math.max(...(fields.map(arr => arr.length)));
        let result      = [];

        for(let i = 0 ; i < fieldsDepth ; i++){
            result.push(
                <tr key = {uuidv4()}>
                    {
                        fields.map(arr => {
                            if(arr[i]){
                                const {className , rowSpan , colSpan , width , name} = arr[i]
                                return <th  key         = {uuidv4()}
                                            className   = {className}
                                            rowSpan     = {rowSpan || "1"}
                                            colSpan     = {colSpan || "1"}
                                            style       = {{width : (width  || "auto")}}>
                                            {name}
                                        </th>
                            }
                            return null
                        })
                    }
                </tr>
            )
        }
        return result;
    }
    render() {
        return (
            <thead>
                {this.showField()}
            </thead>
        )
    }
}
