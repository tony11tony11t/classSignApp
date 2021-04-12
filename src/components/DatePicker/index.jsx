import React, { Component } from 'react'
import './index.css'

export default class DatePicker extends Component {
    months = ['一','二','三','四','五','六','七','八','九','十','十一','十二'];
    weeks = ['日','一','二','三','四','五','六'];
    state = {}
    constructor(props){
        super(props);
        const {date} = this.props;
        
        if(date){
            const {year , month , day} = date;
            this.state = {year : parseInt(year) , month : parseInt(month) , day : parseInt(day)};
        }else{
            let date = new Date();
            this.state = {
                year    : date.getFullYear(),
                month   : date.getMonth() + 1,
                day     : date.getDate()
            };
        }
    }



    getMonthDaysCount = (years,month) => {
        var monthDay = [31,28,31,30,31,30,31,31,30,31,30,31];
        var isLeapYear = () => (years % 400 === 0) || (years % 4 === 0 && years % 100 !== 0);
        return (month === 2 && isLeapYear()) ? 29 : monthDay[month - 1]
    }
    getWeek = (year,month,day) => new Date(year , month - 1 , day).getDay();

    getMonthBody = (year,month) => {
        var dayCount = this.getMonthDaysCount(year,month);
        var space = this.getWeek(year,month,1);
        var spaceEnd = 7 - (dayCount + space) % 7;
        var isPick = d => this.state.day === d ? 'pick' : '';

        var body = [...Array(space).fill("") , 
                    ...Array.from({length:dayCount},(_,i)=> i + 1) ,
                    ...Array(spaceEnd).fill("")];
        var result = [];

        var isSelect =  d => {
            const {year , month} = this.state;
            if(new Date().getTime() < new Date(year , month - 1 , d).getTime()){
                return false
            }
            return true
        }
        for(let i = 0 ; i < Math.ceil(body.length / 7) ; i++){
            result.push(
                <div className='DatePicker-dateRow'>
                {
                    body.slice(i * 7 , i * 7 + 7).map(num =>{
                        let attr = {
                            className : num ? `DatePicker-day ${isPick(num)} ${isSelect(num) ? "" : "disable"}`    : 'DatePicker-day space',
                            onClick   : num && isSelect(num) ? this.handleClickDay.bind(this,num) : null
                        }
                        return <div {...attr}>{num}</div>
                    })
                }
                </div>
            )
        }
        return result;
    }
    handleChangeMonth = (action) => {
        const {month,year} = this.state;

        switch(action){
            case 'prev':
                this.setState({
                    month : month === 1 ? 12 : month - 1,
                    year  : month === 1 ? year - 1 : year,
                    day   : null
                });
            break;
            case 'next':
                this.setState({
                    month : month === 12 ? 1 : month + 1,
                    year  : month === 12 ? year + 1 : year,
                    day   : null
                });
            break;
            default : break;
        }
    }
    handleClickDay = (day) => {
        this.setState({day});
        if(this.props.getDate){  
            this.props.getDate({...this.state , day});
        }
    }

    render() {
        const {month , year} = this.state;
        return (
            <div className='DatePicker'>
                <div className='DatePicker-wrap'>
                    <div className='DatePicker-header'>
                        <span className="DatePicker-prevBtn arrow" onClick={this.handleChangeMonth.bind(this,'prev')}></span>
                        <div className="DatePicker-monthsAndYears">{`${year}年 ${month}月 `}</div>
                        <span className="DatePicker-nextBtn arrow" onClick={this.handleChangeMonth.bind(this,'next')}></span>
                    </div>
                    <div className='DatePicker-weekdays'>
                        {
                            this.weeks.map(tag => <div className='DatePicker-weekTag'>{tag}</div>)
                        }
                    </div>
                    <div className='DatePicker-body'>
                        {this.getMonthBody(year , month)}
                    </div>
                </div>
            </div>
        )
    }
}
