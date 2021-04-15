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
                if(group.student){
                    Object.keys(group.student).forEach(id =>{
                        let student = group.student[id];
                        let studentData = {
                            name : student["name"],
                            normal : student["normalNum"],
                            special : student["specialNum"],
                            total : student["normalNum"] + student["specialNum"],
                            money : student["money"],
                            id,
                            idGroup : key
                        }
                        data.push(studentData);
                    })
                }
                GroupList.push({
                    content : group.name,
                    id      : key,
                    data
                })
            })
        });
        return GroupList;
    }

    getLogRowData = async () => {
        let logList = []
        let filter = {
            orderby : "date",
            lessThan : (()=>{
                let date = new Date();
                let y = date.getFullYear();
                let m = date.getMonth() + 1;
                let d = date.getDate();
                return `${y}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d}`
            })()
        }
        await FirebaseAPI.getData(FirebaseAPI.getLogPath(),"",filter).then(list => {
            list.reverse().forEach(item => {

                let data = {
                    classroom: item["classroom"],
                    group : item["group"],
                    name : item["name"],
                    type : item["type"],
                    id : item["id"]
                }

                if(logList.length !== 0){
                    if(logList[logList.length - 1].content === item["date"]){
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
            classroom = {
                id,
                ...d
            }
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
    
    getStudentRowDate = async (id,idGroup) => {
        let studentData = {}
        await FirebaseAPI.getData(FirebaseAPI.getGroupPath(idGroup),"name").then(n => {
            studentData["group"] = n;
        });
        await FirebaseAPI.getData(FirebaseAPI.getStudentPath(idGroup),id).then(list => {
            studentData = {...studentData , ...list , id};
        });
        return studentData;
    }

    getPersonalLogRowData = async (id) => {
        let logList = [{
            content:null,
            data:[]
        }]
        let filter = {
            orderby : "id",
            equalTo : id
        }
        await FirebaseAPI.getData(FirebaseAPI.getLogPath(),"",filter).then(list => {
            list.reverse().forEach(item => {
                let data = {
                    date        : item["date"],
                    classroom   : item["classroom"],
                    type        : item["type"],
                    id          : item["id"]
                }
                logList[0].data.push(data);
            })
        });
        logList[0].data.sort((a,b) =>  new Date(b.date).getTime() - new Date(a.date).getTime())
        return logList;
    }

    login = async (username,password) => {
        /*TODO - 過濾username的字串 */
        let result = 200;
        await FirebaseAPI.getData(FirebaseAPI.getUserPath(username),"password").then(pw => {
            if(pw === null){
                result = "無此帳號";
            }else if(pw !== password){
                result = "密碼錯誤"
            }
        })
        return result;
    }

    postSignInLog = async (date,classroom,classType,students) => {
        for(let student of [...students]){ 
            await FirebaseAPI
                    .getData(FirebaseAPI.getGroupPath(student.idGroup),"name")
                    .then(async name => {
                        let data = {
                            date        : `${date.year}-${date.month}-${date.day}`, 
                            classroom   : classroom.name ,
                            group       : name ,
                            name        : student.name ,
                            id          : student.id ,
                            type        : classType
                        }
                        FirebaseAPI.postData(FirebaseAPI.getLogPath() , data);
                        this.updateStudentLogNum(student.id , student.idGroup , classType);
            });  
        }
    }

    updateStudentLogNum = (studentId , groupId , classType) => {
        FirebaseAPI.getData(FirebaseAPI.getStudentPath(groupId),studentId).then(async info => {
            const {specialNum , normalNum} = info;
            await FirebaseAPI.updateData(FirebaseAPI.getStudentPath(groupId),studentId,{
                specialNum  : specialNum + (classType === "特殊"), 
                normalNum   : normalNum  + (classType === "一般")
            })
        })
    }

    updateAllStudentMoney = async () => {
        await FirebaseAPI.getData(FirebaseAPI.getGroupPath()).then(groups => {
            Object.keys(groups).forEach(key => {
                let group = groups[key];
                if(group.student){
                    Object.keys(group.student).forEach(id =>{
                        FirebaseAPI.updateData(FirebaseAPI.getStudentPath(key),id,{
                            money : false
                        })
                    })
                }
            })
        });
    } 
    
    postStudent = async (data = {}) => {
        const {id , name} = data.group

        data = Object.assign(data , {
            group       : name,
            normalNum   : 0,
            specialNum  : 0
        })
        
        FirebaseAPI.postData(FirebaseAPI.getStudentPath(id) , data)
    }

    updateStudent = async(newData , oldData) => {
        let myNewData = Object.assign({},newData)
        let myOldData = Object.assign({},oldData)
        const {name : newName , id : newId} = myNewData.group;
        const {name : oldName , id : oldId} = myOldData.group;
        
        myNewData.group = newName;
        if(newName === oldName){
            await FirebaseAPI.updateData(FirebaseAPI.getStudentPath(newId),myNewData.id,myNewData)
        }else{
            //移動資料
            await FirebaseAPI.updateData(FirebaseAPI.getStudentPath(newId),myNewData.id,myNewData);
            await FirebaseAPI.removeData(FirebaseAPI.getStudentPath(oldId),myOldData.id)
        }
        
        
    }

    removeStudent = async(studentId,groupId) => {
        await FirebaseAPI.removeData(FirebaseAPI.getStudentPath(groupId),studentId)
    }

    searchGroupRowData = async searchText => {
        let GroupList = []
        await FirebaseAPI.getData(FirebaseAPI.getGroupPath()).then(groups => {
            Object.keys(groups).forEach(key => {
                let group = groups[key];
                let data = [];
                if(group.student){
                    Object.keys(group.student).forEach(id =>{
                        let student = group.student[id];
                        //比對文字
                        if(student["name"].includes(searchText)){
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
                        }
                    })
                }
                GroupList.push({
                    content : group.name,
                    id      : key,
                    data
                })
            })
        });
        return GroupList;
    }

    removePersonalLog = async logId => {
        await FirebaseAPI.removeData(FirebaseAPI.getLogPath(),logId)
    }

    postClassroom = async (data = {}) => {
        await FirebaseAPI.postData(FirebaseAPI.getClassroomPath(),data);
    }

    updateClassroom = async (data = {}) => {
        await FirebaseAPI.updateData(FirebaseAPI.getClassroomPath(),data.id,data)
    }

    removeClassroom = async classroomId => {
        await FirebaseAPI.removeData(FirebaseAPI.getClassroomPath(),classroomId)
    }

    updatePassword = async password => {
        await FirebaseAPI.updateData(FirebaseAPI.getUserPath(),this.username,{password})
    }

    removeUser = async () => {
        await FirebaseAPI.removeData(FirebaseAPI.getUserPath(),this.username)
    }

    postUser = async (data = {}) => {
        await FirebaseAPI.postData(FirebaseAPI.getUserPath(data.username),data,true)
    }




    getGroupHeadFields = () => {
        let headField = [
            [{
                name : "姓名",
                className : "name",
                width : "30%"
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
                name : "總數",
                className : "title"
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
                label : "姓名",
                placeholder : "王小明"
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
                label : "介紹人",
                placeholder : "王大明"
            },{
                type : "text",
                name : "relationship",
                label : "關係",
                placeholder : "兄弟"
            },{
                type : "text",
                name : "city",
                label : "居住地",
                placeholder : "台北"
            },{
                type : "text",
                name : "career",
                label : "工作",
                placeholder : "學生"
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
                label : "入會原因",
                placeholder : "寫點什麼吧......"
            }
        ]
        return formField;
    }

    getUserFormFields = () => {
        let formField = [
            {
                type : "text",
                name : "username",
                label : "帳號",
                placeholder : "username"
            },{
                type : "text",
                name : "password",
                label : "密碼",
                placeholder : "password"
            },{
                type : "radio",
                name : "role",
                label : "權限",
                options : [{
                    name : "normal",
                    label : "一般"
                },{
                    name : "admin",
                    label : "管理者"
                }]
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
                    colSpan : 2,
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
            }],
            [{
                name : "刪除",
                className : "delete",
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
