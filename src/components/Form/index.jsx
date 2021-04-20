import React, { Component } from 'react'
import signInAPI from '../../signInAPI';
import DatePicker from '../DatePicker'
import './index.css'
import { v4 as uuidv4 } from 'uuid';

export default class Form extends Component {
    state = {
        show        : null, // "DatePicker" | "GroupList"
        groupList   : [],
        userList    : [],
        myData      : {},
        submitEvent : true
    }

    constructor(props){
        super(props);

        //確認是否有資料傳入
        const {data} = this.props

        if(data && Object.keys(data).length){
            //如果有，將資料設定為state的資料
            this.state.myData = {...this.props.data};
        }else{
            const {field} = this.props;
            field.forEach(obj => {
                switch(obj["type"]){
                    case "text"  :
                    case "radio" :
                    case "button":
                        this.state.myData[obj["name"]] = ""
                        break;
                    case "checkbox":
                        obj["options"].forEach(option => {
                            this.state.myData[option["name"]] = false
                        })
                        break;
                    default : break;
                }
            })
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
        if(!myData.startDate){
            this.updateMyData({
                startDate : signInAPI.getToday(),
            })
        }
    }

    initClassroomForm = () => {
        let userList = [];
        signInAPI.getUserRowData().then(list => {
            list[0].data.forEach(item => {
                userList.push({
                    id   : item.id
                });
            })
            this.setState({userList});
        })

        let {user} = this.state.myData
        this.updateMyData({
            user : new Set(user)
        })

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

    updateMyData = (newData = {} , otherData = {}) => {
        this.setState({myData : {
            ...this.state.myData,
            ...newData
        } , ...otherData})
    }

    getDate = date => {
        this.updateMyData({
            startDate : date,
        } , {
            show      : null
        })
    }

    getFieldData = e => {
        this.updateMyData({
            [e.target.name] : e.target.value
        },{
            showTips        : false
        })
    }
    getCheckBoxData = e => {
        this.updateMyData({
            [e.target.value] : e.target.checked
        })
    }

    getGroup = data => {
        if(data){
            this.updateMyData({
                group : data
            },{
                show  : null
            })
        }else{
            this.updateMyData({
                group : {
                    id   : null , 
                    name : this.state.tempGroup
                }
            },{
                show  : null
            })
        }
    }

    showOptions = name => {
        this.setState({
            show : this.state.show === name ? null : name
        });
    }

    showFields = () => {
        const {field}             = this.props;
        const {myData    , show}  = this.state;
        const {startDate , group , user} = this.state.myData;

        return field.map(obj => {
            const { name        : fieldName , 
                    type        : fieldType , 
                    placeholder : fieldPlaceholder , 
                    options     : fieldOptions,
                    label       : fieldLabel} = obj;
            let valueHtml;
            let attr = {
                type    : fieldType,
                name    : fieldName
            }

            switch(fieldType){
                case "text":
                    attr = {
                        ...attr ,
                        onBlur       : this.getFieldData,
                        placeholder  : fieldPlaceholder,
                        defaultValue : myData[fieldName]
                    }

                    valueHtml = <input {...attr}></input>
                    break;
                case "button":
                    if(fieldName === "startDate"){
                        attr = {
                            ...attr ,
                            value   : startDate,
                            onClick : this.showOptions.bind(this , "DatePicker")
                        }
                    }else if(fieldName === "group"){
                        attr = {
                            ...attr ,
                            value   : group && group.name,
                            onClick : this.showOptions.bind(this , "GroupList")
                        }
                    }else if(fieldName === "user"){
                        attr = {
                            ...attr ,
                            value   : [...(user || [])],
                            onClick : this.showOptions.bind(this , "UserList")
                        }
                    }

                    valueHtml = <input {...attr}></input>
                    break;
                case "checkbox":
                    valueHtml = (
                        <fieldset className = {`${fieldName}Group`}>
                            {
                                fieldOptions.map(item => {
                                    const {name , label} = item;
                                    attr = {
                                        ...attr ,
                                        id              : name,
                                        value           : name,
                                        onChange        : this.getCheckBoxData,
                                        defaultChecked  : myData[name] || false
                                    }
                                    return (
                                        <React.Fragment key = {uuidv4()}>
                                            <input {...attr}/>
                                            <label htmlFor = {name}>
                                                {label}
                                            </label>
                                            <br/>
                                        </React.Fragment>
                                    )
                                })
                            }
                        </fieldset>
                    )
                    break;
                case "radio":
                    valueHtml = (
                        <fieldset className={`${fieldName}Group`}>
                            {
                                fieldOptions.map(item => {
                                    const {name , label} = item;
                                    attr = {
                                        ...attr ,
                                        id              : name,
                                        value           : name,
                                        onChange        : this.getFieldData,
                                        defaultChecked  : String(myData[fieldName]) === name
                                    }
                                    return (
                                        <React.Fragment key = {uuidv4()}>
                                            <input {...attr}/>
                                            <label htmlFor={name}>
                                                {label}
                                            </label>
                                            <br/>
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
                        <label htmlFor={fieldName}>
                            {fieldLabel}
                        </label>
                        {valueHtml}
                    </div>
                    {this.showDatePicker(show , fieldName)}
                    {this.showGroupList(show , fieldName)}
                    {this.showUserList(show , fieldName)}
                </React.Fragment>
            )
        })
    }
    getUser = (user) => {
        const {user : userList} = this.state.myData;
        const {id} = user;
        if(userList.has(id)){
            userList.delete(id)
        }else{
            userList.add(id)
        }
        this.updateMyData({
            user : userList
        })
    }

    showUserList = (show , fieldName) => {
        if(show !== "UserList" || fieldName !== "user")
            return;

        const {userList} = this.state;
        return (
            <React.Fragment>
                <ul>
                {
                    userList.map(data => 
                        <li key     = {uuidv4()} 
                            onClick = {this.getUser.bind(this,data)}>
                            {data.id}
                        </li>
                    )
                }
                </ul>
            </React.Fragment>
        )
    }

    showDatePicker = (show , fieldName) => {
        if(show !== "DatePicker" || fieldName !== "startDate")
            return;

        const {startDate} = this.state.myData;
        return <DatePicker getDate={this.getDate} date={startDate}/>
    }
     
    showGroupList = (show , fieldName) => {
        if(show !== "GroupList" || fieldName !== "group" )
            return;

        const {groupList} = this.state;
        return (
            <React.Fragment>
                <ul>
                {
                    groupList.map(data => 
                        <li key     = {uuidv4()} 
                            onClick = {this.getGroup.bind(this,data)}>
                            {data.name}
                        </li>
                    )
                }
                    <div className="newGroup">
                        <input placeholder  = "輸入新組別" 
                               value        = {this.state.tempGroup} 
                               onChange     = {this.tempSaveGroup}/>
                        <button onClick = {this.getGroup.bind(this,null)}>
                            確定
                        </button>
                    </div>
                </ul>
            </React.Fragment>
        )
    }

    tempSaveGroup = e => {
        this.setState({tempGroup : e.target.value})
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

        const {submitEvent} = this.state;
        
        let submit = () => {
            const {myData} = this.state;
            const {submit} = this.props;

            this.setState({submitEvent : false});

            if(this.checkField()){
                return submit.bind(this,myData)()
            }else{
                this.setState({showTips : true})
            }
        }
        

        return <button type         = "button" 
                       className    = "submit" 
                       onClick      = {submitEvent ? submit : null}>
                    儲存
                </button>
    }

    checkField = () => {
        const {myData} = this.state
        let result     = true;
        Object.keys(myData).forEach(field => {
            if(myData[field] === ""){
                result = false;
            }
        })
        return result;
    }

    render() {
        const {showTips} = this.state
        return (
            <form className="EditForm">
                {this.showFields()}
                {showTips ? <p className="FormTips">資料填寫不完整</p> : null}
                <div className="btnGroup">
                    {this.props.remove ? this.showRemoveBtn() : null}
                    {this.props.submit ? this.showSubmitBtn() : null}
                </div>
            </form>
        )
    }
}
