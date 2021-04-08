import React, { Component } from 'react'
import './index.css'

export default class Form extends Component {
    showFields = () => {
        const {field,data} = this.props;

        return field.map(obj => {
            let valueHtml;
            switch(obj["type"]){
                case "text":
                case "button":
                    let attr = {
                        type         : obj["type"] ,
                        name         : obj["name"] ,
                        defaultValue : data && data[obj["name"]]
                    }
                    valueHtml = <input {...attr}></input>
                    break;
                case "checkbox":
                    valueHtml = (
                        <fieldset className={`${obj["name"]}Group`}>
                            {
                                obj["options"].map(item => {
                                    let attr = {
                                        type : obj["type"],
                                        id : item["name"],
                                        name : obj["name"],
                                        value : item["name"],
                                        defaultChecked : data[item["name"]] || false
                                    }
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
                                    let attr = {
                                        type : obj["type"],
                                        id : item["name"],
                                        name : obj["name"],
                                        value : item["name"],
                                        defaultChecked : String(data[obj["name"]]) == item["name"]
                                    }
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

            return (
                <div className="field">
                    <label htmlFor={obj["name"]}>{obj["label"]}</label>
                    {valueHtml}
                </div>
            )
        })
    }
    render() {
        return (
            <form className="EditForm">
                {this.showFields()}
                <div className="btnGroup">
                    <button type="button" className="remove">刪除</button>
                    <button type="button" className="submit">儲存</button>
                </div>
            </form>
        )
    }
}
