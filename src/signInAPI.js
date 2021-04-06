export default class signInAPI{
    getGroupRowData = () => {
        let arr = [{
            content:"第一組",
            data:[
                {
                    name : "唐嘉駿",
                    total : 1000,
                    normal : 50,
                    special : 50,
                    money : "O",
                    id : "001"
                },{
                    name : "唐嘉駿",
                    total : 1000,
                    normal : 50,
                    special : 50,
                    money : "O",
                    id : "002"
                },{
                    name : "唐嘉駿",
                    total : 1000,
                    normal : 50,
                    special : 50,
                    money : "",
                    id : "003"
                },{
                    name : "唐小駿",
                    total : 1000,
                    normal : 50,
                    special : 50,
                    money : "",
                    id : "004"
                },
            ]
        },{
            content:"第二組",
            data:[
                {
                    name : "唐嘉駿",
                    total : 1000,
                    normal : 50,
                    special : 50,
                    money : "O",
                    id : "001"
                },{
                    name : "唐嘉駿",
                    total : 1000,
                    normal : 50,
                    special : 50,
                    money : "O",
                    id : "002"
                },{
                    name : "唐嘉駿",
                    total : 1000,
                    normal : 50,
                    special : 50,
                    money : "",
                    id : "003"
                },{
                    name : "唐小駿",
                    total : 1000,
                    normal : 50,
                    special : 50,
                    money : "",
                    id : "004"
                },
            ]
        }];
        return arr;
    }

    getGroupHeadFields = () => {
        let headField = [
            [{
                name : "姓名",
                className : "name"
            }],
            [{
                name : "總數",
                className : "title"
            }],
            [{
                name : "一般",
                className : "normal"
            }],
            [{
                name : "特殊",
                className : "special"
            }],
            [{
                name : "付費",
                className : "money",
                width : "15%"
            }]
        ];
        return headField;
    }
    
    getGroupFormFields = () => {
        let formField = [
            {
                type : "text",
                name : "name",
                label : "名稱"
            },{
                type : "button",
                name : "startDate",
                label : "入會時間"
            },{
                type : "button",
                name : "group",
                label : "組別"
            },{
                type : "text",
                name : "introducer",
                label : "介紹人"
            },{
                type : "text",
                name : "relationship",
                label : "關係"
            },{
                type : "text",
                name : "city",
                label : "居住地"
            },{
                type : "text",
                name : "career",
                label : "工作"
            },{
                type : "radio",
                name : "payMoney",
                label : "使用付費教室",
                options : [{
                    name : "yes",
                    label : "是"
                },{
                    name : "no",
                    label : "否"
                }]
            },{
                type : "text",
                name : "reason",
                label : "入會原因"
            }
        ]
        return formField;
    }

    getLogRowData = () => {
        let arr = [
            {
                content:"04/03(六)",
                data:[
                    {
                        id : "001",
                        classroom : "一號",
                        group : "第一組",
                        name : "唐嘉駿",
                        type : "一般"
                    },
                    {
                        id : "002",
                        classroom : "二號",
                        group : "第一組",
                        name : "唐嘉駿",
                        type : "一般"
                    },
                    {
                        id : "003",
                        classroom : "三號",
                        group : "第一組",
                        name : "唐嘉駿",
                        type : "一般"
                    },
                    {
                        id : "004",
                        classroom : "四號",
                        group : "第一組",
                        name : "唐嘉駿",
                        type : "一般"
                    }
                ]
            },
            {
                content:"04/04(六)",
                data:[
                    {
                        id : "005",
                        classroom : "一號",
                        group : "第一組",
                        name : "唐嘉駿",
                        type : "一般"
                    },
                    {
                        id : "006",
                        classroom : "二號",
                        group : "第一組",
                        name : "唐嘉駿",
                        type : "一般"
                    },
                    {
                        id : "007",
                        classroom : "三號",
                        group : "第一組",
                        name : "唐嘉駿",
                        type : "一般"
                    },
                    {
                        id : "008",
                        classroom : "四號",
                        group : "第一組",
                        name : "唐嘉駿",
                        type : "一般"
                    }
                ]
            }
        ]
        return arr;
    }

    getLogHeadFields = () => {
        let headField = [
            [{
                name : "教室",
                className : "classroom"
            }],
            [{
                name : "組別",
                className : "group"
            }],
            [{
                name : "學生",
                className : "student"
            }],
            [{
                name : "類型",
                className : "type"
            }]
        ];
        return headField;
    }

    getClassroomRowData = () => {
        let arr = [{
            content:null,
            data:[
                {
                    classroom : "一號教室",
                    normal : "O",
                    apecial : "",
                    money : "O",
                    id : "001"
                },
                {
                    classroom : "一號教室",
                    normal : "O",
                    apecial : "",
                    money : "",
                    id : "002"
                },
                {
                    classroom : "三號教室",
                    normal : "O",
                    apecial : "O",
                    money : "O",
                    id : "003"
                },
                {
                    classroom : "二號教室",
                    normal : "",
                    apecial : "",
                    money : "O",
                    id : "004"
                }
            ]
        }];
        return arr;
    }

    getClassroomHeadFields = () => {
        let headField = [
            [{
                name : "名稱",
                className : "name",
                rowSpan : 2
            }],
            [
                {
                    name : "課程類型",
                    className : "type",
                    colSpan : "2",
                    width: "30%"
                },
                {
                    name : "一般",
                    className : "normal"
                }
            ],
            [
                null,
                {
                    name : "特殊",
                    className : "special"
                }
            ],
            [{
                name : "付費教室",
                className : "money",
                rowSpan : 2,
                width : "25%"
            }]
        ];
        return headField;
    }

    getClassroomFormFields = () => {
        let formField = [
            {
                type : "text",
                name : "name",
                label : "名稱"
            },{
                type : "checkbox",
                name : "type",
                label : "課程類型",
                options : [{
                    name : "normal",
                    label : "一般課程"
                },{
                    name : "special",
                    label : "付費課程"
                }]
            },{
                type : "radio",
                name : "payMoney",
                label : "使用付費教室",
                options : [{
                    name : "yes",
                    label : "是"
                },{
                    name : "no",
                    label : "否"
                }]
            }
        ]
        return formField;
    }

    getPersonalLogHeadFields = () => {
        let headField = [
            [{
                name : "日期",
                className : "date"
            }],
            [{
                name : "教室",
                className : "classroom"
            }],
            [{
                name : "類型",
                className : "type",
                width : "20%"
            }]
        ];
        return headField;
    }

    getPersonalLogRowData = () => {
        let arr = [
            {
                content:null,
                data:[
                    {
                        id : "001",
                        date : "2021/04/10(三)",
                        classroom : "一號教室",
                        type : "一般"
                    },
                    {
                        id : "002",
                        date : "2021/04/10(三)",
                        classroom : "十一號教室",
                        type : "一般"
                    },
                    {
                        id : "003",
                        date : "2021/04/10(三)",
                        classroom : "一號教室",
                        type : "特殊"
                    },
                    {
                        id : "004",
                        date : "2021/04/10(三)",
                        classroom : "一號教室",
                        type : "一般"
                    }
                ]
            }
        ]
        return arr;
    }

    getPersonalRowDate = () => {
        let obj = {
            name : "王大明",
            startDate : "2019-03-22",
            group : "第一組",
            introducer : "哇哈哈",
            relationship : "板橋",
            city : "板橋市",
            career : "職業",
            payMoney : "否",
            reason : "哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼哇哈哈＼",
        }
        return obj;
    }

    getPersonalHeadFields = () => {
        const labels = [
            {
                label : "姓名",
                name : "name"
            },{
                label : "入會時間",
                name : "startDate"
            },{
                label : "組別",
                name : "group"
            },{
                label : "介紹人",
                name : "introducer"
            },{
                label : "關係",
                name : "relationship"
            },{
                label : "居住地",
                name : "city"
            },{
                label : "工作",
                name : "career"
            },{
                label : "使用付費教室",
                name : "payMoney"
            },{
                label : "入會原因",
                name : "reason"
            }
        ];
        return labels;
    }
    
    getUserRowData = () => {
        let arr = [{
            content:null,
            data:[{
                id : "001",
                username : "tony11234",
                password : "13245",
                role : "一般會員"
            }]
        }]
        return arr;
    }

    getUserHeadFields = () => {
        let headField = [
            [{
                name : "帳號",
                className : "username"
            }],
            [{
                name : "密碼",
                className : "password"
            }],
            [{
                name : "權限",
                className : "role"
            }]
        ];
        return headField;
    }
}
