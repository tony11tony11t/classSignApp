import React, { Component } from 'react'
import './index.css'

export default class Edit extends Component {

    render() {
        return (
            <div className="EditContainer">
                <form>
                    <div className="field">
                        <label htmlFor="name">名稱</label>
                        <input type="text" name="name"></input>
                    </div>
                    
                    <div className="field">
                        <label htmlFor="type">課程類型</label>
                        <fieldset id="type" className="typeGroup">
                            <input type="checkbox" id="normal" name="normal" value="normal"/>
                            <label htmlFor="normal">一般課程</label><br/>
                            <input type="checkbox" id="special" name="special" value="special"/>
                            <label htmlFor="special">付費課程</label>
                        </fieldset>
                    </div>

                    <div className="field">
                        <label htmlFor="payMoney">使用付費教室</label>
                        <fieldset id="payMoney">
                            <input type="radio" id="yes" name="payMoney" value="yes"/>
                            <label htmlFor="yes">是</label><br/>
                            <input type="radio" id="no" name="payMoney" value="no"/>
                            <label htmlFor="no">否</label>
                        </fieldset>
                    </div>
                    
                    <div className="btnGroup">
                        <button type="button" className="remove">刪除</button>
                        <button type="button" className="submit">儲存</button>
                    </div>

                </form>
            </div>
        )
    }
}
