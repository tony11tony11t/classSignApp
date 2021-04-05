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
                className : "money"
            }]
        ];
        return headField;
    }

    getLogRowData = () => {
        let arr = [
            {
                content:"04/03(六)",
                data:[
                    {
                        classroom : "一號",
                        group : "第一組",
                        name : "唐嘉駿",
                        type : "一般"
                    },
                    {
                        classroom : "二號",
                        group : "第一組",
                        name : "唐嘉駿",
                        type : "一般"
                    },
                    {
                        classroom : "三號",
                        group : "第一組",
                        name : "唐嘉駿",
                        type : "一般"
                    },
                    {
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
                        classroom : "一號",
                        group : "第一組",
                        name : "唐嘉駿",
                        type : "一般"
                    },
                    {
                        classroom : "二號",
                        group : "第一組",
                        name : "唐嘉駿",
                        type : "一般"
                    },
                    {
                        classroom : "三號",
                        group : "第一組",
                        name : "唐嘉駿",
                        type : "一般"
                    },
                    {
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
                    colSpan : "2"
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
                rowSpan : 2
            }]
        ];
        return headField;
    }
}
