import React, { Component } from 'react'
import signInAPI from '../../signInAPI';
import DatePicker from '../DatePicker'
import './index.css'
import { v4 as uuidv4 } from 'uuid';

export default class Form extends Component {
    state = {
        show : null, // "DatePicker" | "GroupList"
        groupList : [],
        myData : {}
    }

    constructor(props){
        super(props);

        //確認是否有資料傳入
        const {data} = this.props

        if(data && Object.keys(data).length){
            //如果有，將資料設定為state的資料
            this.state.myData = {...this.props.data};
        }
    }

    initStudentForm = () => {
        let groupList = [];
        signInAPI.getGroupRowData().then(list => {
            list.forEach(item => {
                groupList.push({
                    name : item.content,
                    id   : item.id
                });
            })
            this.setState({groupList});
        })

        //如果資料有startDate屬性，改寫他
        const {myData} = this.state;
        if(myData.startDate){
            let date = myData.startDate.split("-");
            this.updateMyData({
                year  : date[0],
                month : date[1],
                day   : date[2]
            })
            delete this.state.myData.startDate;
        }else{
            let date = new Date();
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            let d = date.getDate();

            this.updateMyData({
                year    : y,
                month   : m < 10 ? `0${m}` : m,
                day     : d < 10 ? `0${d}` : d
            })
        }
    }

    initClassroomForm = () => {

    }

    componentDidMount = () => {
        const {subject} = this.props;
        switch(subject){
            case "student":
                this.initStudentForm();
                break;
            case "classroom":
                this.initClassroomForm();
                break;
            default:break;
        }
    }

    updateMyData = (newData = {}) => {
        this.setState({myData : Object.assign(this.state.myData , newData)})
    }

    getDate = date => {
        let {year , month , day} = date;
        this.updateMyData({
            year, 
            month : month < 10 ? `0${month}` : month, 
            day   : day < 10 ? `0${day}` : day
        })
        this.setState({show : null})
    }

    getFieldData = e => {
        let field = e.target.name;
        let value = e.target.value;
        this.updateMyData({[field]:value})
    }
    getCheckBoxData = e => {
        let field = e.target.value;
        let value = e.target.checked;
        this.updateMyData({[field]:value})
    }

    getGroup = data => {
        this.updateMyData({group:data})
        this.setState({show : null})
    }

    showOptions = name => {
        this.setState({show : this.state.show === name ? null : name});
    }

    showFields = () => {
        const {field} = this.props;
        const {myData,show} = this.state;
        const {year,month,day,group} = this.state.myData;

        return field.map(obj => {
            let valueHtml;
            let attr = {
                type         : obj["type"] ,
                name         : obj["name"] ,
                defaultValue : myData[obj["name"]]
            }
            switch(obj["type"]){
                case "text":
                    attr = Object.assign(attr , {
                        placeholder : obj["placeholder"],
                        onChange : this.getFieldData
                    })
                    valueHtml = <input {...attr}></input>
                    break;
                case "button":
                    if(obj["name"] === "startDate"){
                        attr = Object.assign(attr , {
                            value   : `${year}-${month}-${day}`,
                            onClick : this.showOptions.bind(this,"DatePicker")
                        })
                    }else if(obj["name"] === "group"){
                        attr = Object.assign(attr , {
                            value   : group && group.name,
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
                                    let name = item["name"];
                                    attr = Object.assign(attr , {
                                        id : name,
                                        value : name,
                                        onChange : this.getCheckBoxData,
                                        defaultChecked : myData[name] || false
                                    })
                                    return (
                                        <React.Fragment key={uuidv4()}>
                                            <input {...attr}/>
                                            <label htmlFor={attr.id}>{item["label"]}</label><br/>
                                        </React.Fragment>
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
                                    let name = item["name"]
                                    attr = Object.assign(attr , {
                                        id : name,
                                        value : name,
                                        onChange : this.getFieldData,
                                        defaultChecked : String(myData[obj["name"]]) === name
                                    })
                                    return (
                                        <React.Fragment key={uuidv4()}>
                                            <input {...attr}/>
                                            <label htmlFor={attr.id}>{item["label"]}</label><br/>
                                        </React.Fragment>
                                    )
                                })
                            }
                        </fieldset>
                    )
                    break;
                default:break;
            }

            return (
                <React.Fragment key={uuidv4()}>
                    <div className="field">
                        <label htmlFor={obj["name"]}>{obj["label"]}</label>
                        {valueHtml}
                    </div>
                    {show === "DatePicker" && obj["name"] === "startDate" ? <DatePicker getDate={this.getDate} date={{year,month,day}}/> : null}
                    {show === "GroupList" && obj["name"] === "group" ? this.showGroupList() : null}
                </React.Fragment>
            )
        })
    }
     
    showGroupList = () => {
        const {groupList} = this.state;
        return (
            <ul>
            {
                groupList.map(data => 
                    <li key={uuidv4()} onClick={this.getGroup.bind(this,data)}>{data.name}</li>
                )
            }
            </ul>
        )
    }
    showRemoveBtn = () => {
        const {remove , subject} = this.props;
        var onClick;
        if(subject === "classroom"){
            var {id : classroomId} = this.state.myData;
            onClick = remove.bind(this,classroomId);
        }else if(subject === "student"){
            var {id : studentId} = this.state.myData;
            var {id : groupId}   = this.state.myData.group;
            onClick = remove.bind(this,studentId,groupId);
        }

        return <button type         = "button" 
                       className    = "remove" 
                       onClick      = {onClick}>
                    刪除
                </button>
    }

    showSubmitBtn = () => {
        const {myData} = this.state;
        const {submit} = this.props;

        return <button type         = "button" 
                       className    = "submit" 
                       onClick      = {submit.bind(this,myData)}>
                    儲存
                </button>
    }

    render() {
        return (
            <form className="EditForm">
                {this.showFields()}
                <div className="btnGroup">
                    {this.props.remove ? this.showRemoveBtn() : null}
                    {this.props.submit ? this.showSubmitBtn() : null}
                </div>
            </form>
        )
    }
}
