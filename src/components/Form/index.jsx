import React, { Component } from 'react'
import './index.css'

export default class Form extends Component {
    showFields = () => {
        const {field} = this.props;

        return field.map(obj => {
            let valueHtml;
            switch(obj["type"]){
                case "text":
                case "button":
                    valueHtml = <input type={obj["type"]} name={obj["name"]}></input>
                    break;
                case "checkbox":
                case "radio":
                    valueHtml = (
                        <fieldset className={`${obj["name"]}Group`}>
                            {
                                obj["options"].map(item => (
                                    <>
                                    <input type={obj["type"]} id={item["name"]} name={obj["name"]} value={item["name"]}/>
                                    <label htmlFor={item["name"]}>{item["label"]}</label><br/>
                                    </>
                                ))
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
