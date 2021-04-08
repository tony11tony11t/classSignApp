import FirebaseAPI from './FirebaseAPI'
class signInAPI{

    /*global variable*/
    username = "tony";

    getPage = (obj , page) => obj.setState({page});

    getGroupRowData = async () => {
        let GroupList = []
        await FirebaseAPI.getData(FirebaseAPI.getGroupPath()).then(groups => {
            Object.keys(groups).forEach(key => {
                let group = groups[key];
                
                let data = [];
                Object.keys(group.student).forEach(id =>{
                    let student = group.student[id];
                    let studentData = {
                        name : student["name"],
                        total : student["normalNum"] + student["specialNum"],
                        normal : student["normalNum"],
                        special : student["specialNum"],
                        money : student["money"],
                        id,
                        idGroup : key
                    }
                    data.push(studentData);
                })

                GroupList.push({
                    content : group.name,
                    data
                })
            })
        });
        return GroupList;
    }

    getLogRowData = async () => {
        let logList = []
        await FirebaseAPI.getData(FirebaseAPI.getLogPath()).then(list => {
            list.forEach(item => {

                let data = {
                    classroom: item["classroom"],
                    group : item["group"],
                    name : item["name"],
                    type : item["type"],
                    id : item["id"]
                }

                if(logList.length != 0){
                    if(logList[logList.length - 1].content == item["date"]){
                        logList[logList.length - 1].data.push(data); 
                    }else{
                        logList.push({
                            content: item["date"],
                            data : [data]
                        })
                    }
                }else{
                    logList.push({
                        content: item["date"],
                        data : [data]
                    })
                }

            })
        });
        return logList;
    }

    getClassroomsRowData = async () => {
        let classroomList = [{
            content:null,
            data:[]
        }]
        await FirebaseAPI.getData(FirebaseAPI.getClassroomPath()).then(list => {
            Object.keys(list).forEach(id => {
                let item = {
                    name: list[id]["name"],
                    normal : list[id]["normal"],
                    special : list[id]["special"],
                    money : list[id]["money"],
                    id
                }
                classroomList[0].data.push(item)
            })
        });
        return classroomList;
    }

    getClassroomData = async (id) => {
        let classroom;
        await FirebaseAPI.getData(FirebaseAPI.getClassroomPath(id)).then(d => {
            classroom = d;
        })
        return classroom;
    }

    getUserRowData = async () => {
        let userList = [{
            content:null,
            data:[]
        }]
        await FirebaseAPI.getData(FirebaseAPI.getUserPath()).then(list => {
            Object.keys(list).forEach(id => {
                let item = {
                    username: list[id]["username"],
                    password : list[id]["password"],
                    role : list[id]["role"],
                    id
                }
                userList[0].data.push(item)
            })
        });
        return userList;
    }

    getUserData = async (username) => {
        let user;
        await FirebaseAPI.getData(FirebaseAPI.getUserPath(username)).then(d => {
            user = d;
        })
        return user;
    }

    login = async (username,password) => {
        /*TODO - 過濾username的字串 */
        let result = 200;
        await FirebaseAPI.getData(FirebaseAPI.getUserPath(username),"password").then(pw => {
            if(pw == null){
                result = "無此帳號";
            }else if(pw != password){
                result = "密碼錯誤"
            }
        })
        return result;
    }
    
    getStudentRowDate = async (id,idGroup) => {
        let studentData = {}
        await FirebaseAPI.getData(FirebaseAPI.getGroupPath(idGroup),"name").then(n => {
            studentData["group"] = n;
        });
        await FirebaseAPI.getData(FirebaseAPI.getStudentPath(idGroup),id).then(list => {
            studentData = {...studentData , ...list};
        });
        return studentData;
    }

    postSignInLog = async (date,classroom,classType,students) => {
        date = `${date.year}-${date.month}-${date.day}`;
        students = [...students];
        let className = classroom.name;
        for(let student of students){
            let groupName;
            await FirebaseAPI.getData(FirebaseAPI.getGroupPath(student.idGroup),"name").then(name => groupName = name);
            FirebaseAPI.postLog(date , className , groupName , student.name , classType)
        }
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
                name : "money",
                label : "使用付費教室",
                options : [{
                    name : "true",
                    label : "是"
                },{
                    name : "false",
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
                name : "money",
                label : "使用付費教室",
                options : [{
                    name : "true",
                    label : "是"
                },{
                    name : "false",
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
                name : "money"
            },{
                label : "入會原因",
                name : "reason"
            }
        ];
        return labels;
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
export default new signInAPI()
