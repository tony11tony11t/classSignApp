import React, { Component } from 'react'

export default class TableHead extends Component {

    showField = () => {
        const {fields} = this.props;
        let fieldsDepth = Math.max(...(fields.map(arr => arr.length)));
        let result = [];
        for(let i = 0 ; i < fieldsDepth ; i++){
            result.push(
                <tr>
                    {
                        fields.map(arr =>{
                            if(arr[i] == null) return;
                            return <th className={arr[i]["className"]}
                                        rowSpan={arr[i]["rowSpan"] || "1"}
                                        colSpan={arr[i]["colSpan"] || "1"}>
                                        {arr[i]["name"]}
                                    </th>
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
                {
                    this.showField()
                }
            </thead>
        )
    }
}
