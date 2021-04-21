import React, { Component } from 'react'
import './index.css'

export default class DatePicker extends Component {
    months = ['一','二','三','四','五','六','七','八','九','十','十一','十二'];
    weeks  = ['日','一','二','三','四','五','六'];
    state  = {}

    constructor(props){
        super(props);

        const {date} = this.props;
        
        //whether or not send the date to DatePicker
        if(date){
            let dateBlock = date.split("-");
            this.state = {
                year  : parseInt(dateBlock[0]) , 
                month : parseInt(dateBlock[1]) , 
                day   : parseInt(dateBlock[2])
            };
        }else{
            let date   = new Date();
            this.state = {
                year    : date.getFullYear(),
                month   : date.getMonth() + 1,
                day     : date.getDate()
            };
        }
    }

    /**
     * Return how many days are there in specified month
     * @param   {Number} year
     * @param   {Number} month 
     * @returns {Number}
     */
    getMonthDaysCount = (year , month) => {
        var monthDay   = [31 , 28 , 31 , 30 , 31 , 30 , 31 , 31 , 30 , 31 , 30 , 31];
        /**
         * Whether or not this year is leap year
         * @returns {Boolean}
         */
        var isLeapYear = () => (year % 400 === 0) || (year % 4 === 0 && year % 100 !== 0);

        return (month === 2 && isLeapYear()) ? 29 : monthDay[month - 1]
    }

    /**
     * Return what day of the week
     * @param   {Number} year 
     * @param   {Number} month 
     * @param   {Number} day 
     * @returns {Number}
     */
    getWeek = (year , month , day) => new Date(year , month - 1 , day).getDay();

    /**
     * Return the component of this month body
     * @param   {Number} year 
     * @param   {Number} month 
     * @returns {Array}
     */
    getMonthBody = (year , month) => {
        var dayCount = this.getMonthDaysCount(year , month);
        var space    = this.getWeek(year , month , 1);
        var spaceEnd = 7 - (dayCount + space) % 7;
        var result   = [];
        var body     = [...Array(space).fill("") , 
                        ...Array.from({length : dayCount} , (_ , i)=> i + 1) ,
                        ...Array(spaceEnd).fill("")];

        /**
         * Whether or not this day be clicked
         * @param {Number} d day
         * @returns {String}
         */
        var isPick   = d => this.state.day === d ? 'pick' : '';

        /**
         * Whether or not this day can be clicked
         * @param {Number} d day
         * @returns {String}
         */
        var isSelect = d => {
            const {year , month} = this.state;
            return new Date().getTime() >= new Date(year , month - 1 , d).getTime()
        }


        for(let i = 0 ; i < Math.ceil(body.length / 7) ; i++){
            result.push(
                <div className='DatePicker-dateRow'>
                {
                    body.slice(i * 7 , i * 7 + 7).map(num =>{
                        let attr = {
                            className : num ? `DatePicker-day ${isPick(num)} ${isSelect(num) ? "" : "disable"}` : 'DatePicker-day space',
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

    /**
     * Change current year or month in the state
     * @param {String} action choose next month or previous month
     */
    handleChangeMonth = (action) => {
        const {month , year} = this.state;

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
    /**
     * Set the date for the state
     * @param {Number} day 
     */
    handleClickDay = day => {
        this.setState({day});
        if(this.props.getDate){  
            let {year , month} = this.state;

            month = month < 10 ? `0${month}` : month;
            day   = day < 10   ? `0${day}`   : day;
            
            this.props.getDate(`${year}-${month}-${day}`);
        }
    }

    render() {
        const {month , year} = this.state;
        return (
            <div className = 'DatePicker'>
                <div className = 'DatePicker-wrap'>
                    <div className = 'DatePicker-header'>
                        <span className = "DatePicker-prevBtn arrow" 
                              onClick   = {this.handleChangeMonth.bind(this,'prev')} />
                        <div  className = "DatePicker-monthsAndYears">
                            {`${year}年 ${month}月 `}
                        </div>
                        <span className = "DatePicker-nextBtn arrow" 
                              onClick   = {this.handleChangeMonth.bind(this,'next')} />
                    </div>
                    <div className = 'DatePicker-weekdays'>
                        {this.weeks.map(tag => {
                            return <div className = 'DatePicker-weekTag'>
                                        {tag}
                                    </div>
                        })}
                    </div>
                    <div className = 'DatePicker-body'>
                        {this.getMonthBody(year , month)}
                    </div>
                </div>
            </div>
        )
    }
}
