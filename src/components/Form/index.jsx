import React, { Component } from 'react'
import { v4 as uuidv4 }     from 'uuid';
import signInAPI            from '../../signInAPI';
import DatePicker           from '../DatePicker'
import './index.css'

export default class Form extends Component {

    state = {
         /**
         * Decide which component will be shown
         */
        show        : null, // "DatePicker" | "GroupList" | null

        /**
         * Save the group ist
         */
        groupList   : [],

        /**
         * Save the user list
         */
        userList    : [],

        /**
         * Save the form data which is user inputs
         */
        myData      : {},

        /**
         * Whether or not user can submit form
         */
        submitEvent : true
    }

    constructor(props){
        super(props);

       
        const {data} = this.props

        //Whether or not property has data
        if(data && Object.keys(data).length){
            //if true , set data to the state
            this.state.myData = {...this.props.data};
        }else{
            //if false , initialize the data of the field
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

    /**
     * initialize the student form
     */
    initStudentForm = () => {
        //Loading group list
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

        //Set start date
        const {myData} = this.state;
        if(!myData.startDate){
            this.updateMyData({
                startDate : signInAPI.getToday(),
            })
        }
    }

    /**
     * initialize the classroom form
     */
    initClassroomForm = () => {
        //Loading user list
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

    /**
     * Update my data of the state
     * @param {Object} newData 
     * @param {Object} otherData 
     */
    updateMyData = (newData = {} , otherData = {}) => {
        this.setState({myData : {
            ...this.state.myData,
            ...newData
        } , ...otherData})
    }

    /**
     * Set the date to the state
     * @param {String} date 
     */
    getDate = date => {
        this.updateMyData({
            startDate : date,
        } , {
            show      : null
        })
    }

    /**
     * Set the value of specified field to the state
     * @param {Event} e event
     */
    getFieldData = e => {
        this.updateMyData({
            [e.target.name] : e.target.value
        },{
            showTips        : false
        })
    }

    /**
     * Set the value of checkbox to the state
     * @param {Event} e event
     */
    getCheckBoxData = e => {
        this.updateMyData({
            [e.target.value] : e.target.checked
        })
    }

    /**
     * Set group data to the state
     * @param {Object} data group data
     */
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

    /**
     * Change component for the state
     * @param {String} name  component name
     */
    showOptions = name => this.setState({show : this.state.show === name ? null : name});
    

    /**
     * Return the fields and input box
     * @returns 
     */
    showFields = () => {
        const {field}                    = this.props;
        const {myData    , show}         = this.state;
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

    /**
     * Set users to the state
     * @param {Object} user users list
     */
    getUser = user => {
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

    /**
     * Return the component of user list
     * @param   {String} show  component name
     * @param   {String} fieldName field name
     * @returns {Component}
     */
    showUserList = (show , fieldName) => {
        if(show !== "UserList" || fieldName !== "user")
            return;

        const {userList} = this.state;
        return (
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
        )
    }

    /**
     * Return the component of DatePicker
     * @param   {String} show component name
     * @param   {String} fieldName field name
     * @returns {Component}
     */
    showDatePicker = (show , fieldName) => {
        if(show !== "DatePicker" || fieldName !== "startDate")
            return;

        const {startDate} = this.state.myData;
        return <DatePicker getDate = {this.getDate} 
                           date    = {startDate}/>
    }
    
    /**
     * Return the component of group list
     * @param   {String} show component name
     * @param   {String} fieldName field name
     * @returns {Component}
     */
    showGroupList = (show , fieldName) => {
        if(show !== "GroupList" || fieldName !== "group" )
            return;

        const {groupList} = this.state;
        return (
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
                    <input placeholder   = "輸入新組別" 
                            value        = {this.state.tempGroup} 
                            onChange     = {this.tempSaveGroup}/>
                    <button onClick = {this.getGroup.bind(this , null)}>
                        確定
                    </button>
                </div>
            </ul>
        )
    }

    /**
     * Save the temp group name
     * @param {Event} e event 
     */
    tempSaveGroup = e => this.setState({tempGroup : e.target.value});

    /**
     * Return the remove button
     * @returns {Component}
     */
    showRemoveBtn = () => {
        const {remove , subject} = this.props;
        var onClick;

        switch(subject){
            case "classroom" :
                var {id : classroomId} = this.state.myData;
                onClick = remove.bind(this , classroomId);
                break;
            case "student" : 
                var {id : studentId} = this.state.myData;
                var {id : groupId}   = this.state.myData.group;
                onClick = remove.bind(this , studentId , groupId);
                break;
            default:break;
        }

        return <button type         = "button" 
                       className    = "remove" 
                       onClick      = {onClick}>
                    刪除
                </button>
    }

    /**
     * Return submit button
     * @returns {Component}
     */
    showSubmitBtn = () => {

        const {submitEvent} = this.state;
        
        /**
         * Submit event for the submit button
         * @returns {Function | null}
         */
        let submit = () => {
            const {myData} = this.state;
            const {submit} = this.props;

            if(this.checkField()){
                this.setState({submitEvent : false});
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

    /**
     * Whether or not each field has value
     * @returns {Boolean}
     */
    checkField = () => {
        const {myData} = this.state
    
        return Object.keys(myData).every(field => myData[field] !== "");
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
