import React, { Component } from 'react'
import './index.css'

export default class Edit extends Component {

    render() {
        return (
            <div className="EditContainer">
                <form>
                    <div className="field">
                        <label for="name">姓名</label>
                        <input type="text" name="name"></input>
                    </div>

                    <div className="field">
                        <label for="startdate">入會時間</label>
                        <button type="button">2019/04/03(三)</button>
                    </div>

                    <div className="field">
                        <label for="group">組別</label>
                        <button type="button">第一組</button>
                    </div>

                    <div className="field">
                        <label for="introducer">介紹人</label>
                        <input type="text" name="introducer"></input>
                    </div>

                    <div className="field">
                        <label for="relationship">關係</label>
                        <input type="text" name="relationship"></input>
                    </div>

                    <div className="field">
                        <label for="city">居住地</label>
                        <input type="text" name="city"></input>
                    </div>

                    <div className="field">
                        <label for="career">工作</label>
                        <input type="text" name="career"></input>
                    </div>

                    <div className="field">
                        <label for="payMoney">使用付費教室</label>
                        <fieldset id="payMoney">
                            <input type="radio" id="yes" name="payMoney" value="yes"/>
                            <label for="yes">是</label>
                            <input type="radio" id="no" name="payMoney" value="no"/>
                            <label for="no">否</label>
                        </fieldset>
                    </div>

                    <div className="field">
                        <label for="reason">入會原因</label>
                        <input type="text" name="reason"></input>
                    </div>

                    <button type="button" className="subbmit">儲存</button>

                </form>
            </div>
        )
    }
}
