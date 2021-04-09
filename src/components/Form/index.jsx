import React, { Component } from 'react'
import signInAPI from '../../signInAPI';
import DatePicker from '../DatePicker'
import './index.css'

export default class Form extends Component {
    state = {
        show : null, // "DatePicker" | "GroupList"

        groupList : [],

        //個人資料
        name : null,
        group : null,
        introducer : null,
        relationship : null,
        city : null,
        career : null,
        money : null,
        reason : null

    }

    constructor(props){
        super(props);
        //當組件建置時將時間設定成本地的今天
        let date = new Date();
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        let d = date.getDate();

        this.state = {
            ...this.state,
            year    : y,
            month   : m < 10 ? `0${m}` : m,
            day     : d < 10 ? `0${d}` : d
        };
    }

    componentDidMount = () => {
        let groupList = []
        signInAPI.getGroupRowData().then(list => {
            list.forEach(item => {
                let name = item.content;
                let id = item.data[0].idGroup;
                groupList.push({name , id});
            })
            this.setState({groupList});
        })
    }

    getDate = date => {
        let {year , month , day} = date;
        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;
        this.setState({year , month , day , show : null});
    }

    getFieldData = e => {
        let field = e.target.name;
        let value = e.target.value;
        this.setState({[field]:value});
    }

    getGroup = data => this.setState({group : data , show : null})

    showOptions = (name) => this.setState({show : this.state.show === name ? null : name});

    showFields = () => {
        const {field,data} = this.props;

        return field.map(obj => {
            let valueHtml;
            let attr = {
                type         : obj["type"] ,
                name         : obj["name"] ,
                defaultValue : data && data[obj["name"]],
            }
            switch(obj["type"]){
                case "text":
                    attr = Object.assign(attr , {
                        placeholder : obj.placeholder,
                        onChange : this.getFieldData
                    })
                    valueHtml = <input {...attr}></input>
                    break;
                case "button":
                    if(obj["name"] == "startDate"){
                        const {year,month,day} = this.state;
                        attr = Object.assign(attr , {
                            value : `${year}-${month}-${day}`,
                            onClick : this.showOptions.bind(this,"DatePicker")
                        })
                    }else if(obj["name"] == "group"){
                        attr = Object.assign(attr , {
                            value : this.state.group && this.state.group.name,
                            onClick : this.showOptions.bind(this,"GroupList")
                        })
                    }
                    valueHtml = <input {...attr}></input>
                    break;
                case "checkbox":
                    valueHtml = (
                        <fieldset className={`${obj["name"]}Group`}>
                            {
                                obj["options"].map(item => {
                                    attr = Object.assign(attr , {
                                        id : item["name"],
                                        value : item["name"],
                                        defaultChecked : data[item["name"]] || false
                                    })
                                    return (
                                        <>
                                        <input {...attr}/>
                                        <label htmlFor={attr.id}>{item["label"]}</label><br/>
                                        </>
                                    )
                                })
                            }
                        </fieldset>
                    )
                    break;
                case "radio":
                    valueHtml = (
                        <fieldset className={`${obj["name"]}Group`}>
                            {
                                obj["options"].map(item => {
                                    attr = Object.assign(attr , {
                                        id : item["name"],
                                        value : item["name"],
                                        onChange : this.getFieldData,
                                        defaultChecked : String(data[obj["name"]]) == item["name"]
                                    })
                                    return (
                                        <>
                                        <input {...attr}/>
                                        <label htmlFor={attr.id}>{item["label"]}</label><br/>
                                        </>
                                    )
                                })
                            }
                        </fieldset>
                    )
                    break;
                default:break;
            }
            const {show} = this.state;
            return (
                <>
                <div className="field">
                    <label htmlFor={obj["name"]}>{obj["label"]}</label>
                    {valueHtml}
                </div>
                {show === "DatePicker" && obj["name"] === "startDate" ? <DatePicker getDate={this.getDate}/> : null}
                {show === "GroupList" && obj["name"] === "group" ? this.showGroupList() : null}
                </>
            )
        })
    }
     
    showGroupList = () => {
        const {groupList} = this.state;
        return (
            <ul>
            {
                groupList.map(data => 
                    <li onClick={this.getGroup.bind(this,data)}>{data.name}</li>
                )
            }
            </ul>
        )
    }

    render() {
        return (
            <form className="EditForm">
                {this.showFields()}
                <div className="btnGroup">
                    <button type="button" className="remove">刪除</button>
                    <button type="button" className="submit" onClick={this.props.submit.bind(this,this.state)}>儲存</button>
                </div>
            </form>
        )
    }
}
