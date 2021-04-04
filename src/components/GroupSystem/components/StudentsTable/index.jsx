import React, { Component } from 'react'
import './index.css'

export default class StudentTable extends Component {
    getGroupRow = (group) => {
        return (
            <tr>
                <td colSpan="5" className="GroupDivide">{group}</td>
            </tr>
        )
    }
    getStudent = (id,name,total,norNum,speNum,money) => {
        return (
            <tr className="Student" onClick={this.handleStudentClick.bind(this,id)}>
                <td>{name}</td>
                <td>{total}</td>
                <td>{norNum}</td>
                <td>{speNum}</td>
                <td>{money}</td>
            </tr>
        )
    }
    handleStudentClick = (id) => this.props.showStudent(id);
    
    render() {
        return (
            <table className="GroupTable" border="0" cellspacing="0" cellpadding="0">
                <thead>
                    <tr>
                        <th>姓名</th>
                        <th>總數</th>
                        <th>一般</th>
                        <th>特殊</th>
                        <th className='Money'>付費</th>
                    </tr>
                </thead>
                <tbody>
                    {this.getGroupRow("第一組")}
                    {this.getStudent(0,"唐嘉駿",1000,50,50,"否")}
                    {this.getStudent(1,"唐嘉駿",100,50,50,"否")}
                    {this.getStudent(2,"唐嘉駿",100,50,50,"否")}
                    {this.getStudent(3,"唐嘉駿",100,50,50,"否")}
                    {this.getGroupRow("第二組")}
                    {this.getStudent(4,"唐嘉駿",100,50,50,"否")}
                    {this.getStudent(5,"唐嘉駿",100,50,50,"否")}
                </tbody>
            </table>
        )
    }
}
