import FirebaseAPI from './FirebaseAPI'
class signInAPI{

    /**
     * save username
     */
    username = null;

    /**
     * In every system,use this function to decide which page can be shown.
     * @param {Object} obj   always use "this" in this param
     * @param {String} page  page name
     */
    getPage = (obj , page) => {obj.setState({page})};

    /**
     * Return today date
     * @returns {String}
     */
    getToday = () => {
        let date = new Date();
        let y    = date.getFullYear();
        let m    = date.getMonth() + 1;
        let d    = date.getDate();
        return `${y}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d}`
    }

    /**
     * Return the groups and student brief data from the firebase.
     * The following is the structure of an element in the return value,
     * {
     *  content : {group name}
     *  id      : {group id}
     *  data    : {student information}
     * }
     * the other one is the structure of student element,
     * {
     *  name    : {student name},
     *  normal  : {the times of normal classroom roll call},
     *  special : {the times of special classroom roll call},
     *  total   : {the times of all classroom roll call},
     *  money   : {whether or not student pay money},
     *  id      : {student id},
     *  idGroup : {group id},
     * }
     * @returns {Array}
     */
    getGroupRowData = async () => {
        let groupList = []
        let groupPath = FirebaseAPI.getGroupPath();
        await FirebaseAPI.getData(groupPath).then(groups => {
            Object.keys(groups).forEach(key => {
                let group = groups[key];
                let data = [];
                if(group.student){
                    Object.keys(group.student).forEach(id =>{
                        const {name , normalNum , specialNum , money} = group.student[id];
                        let studentData = {
                            name,
                            normal  : normalNum,
                            special : specialNum,
                            total   : normalNum + specialNum,
                            money,
                            id,
                            idGroup : key
                        }
                        data.push(studentData);
                    })

                    data.sort((a , b) => b.total - a.total)
                    
                    groupList.push({
                        content : group.name,
                        id      : key,
                        data
                    })
                }else{
                    //if there is no body in the group,remove it.
                    this.removeGroup(key);
                }
            })
        });
        return groupList;
    }

    /**
     * Return the Log from the firebase.
     * The following is the structure of an element in the return value,
     * {
     *  content : {date}
     *  data    : {log information}
     * }
     * the other one is the structure of log element,
     * {
     *  classroom : {classroom name} 
     *  group     : {group name}
     *  name      : {student name}
     *  type      : {class type,normal or special}
     *  id        : {student id}
     * }
     * @returns {Array}
     */
    getLogRowData = async () => {
        let logList = []
        let logPath = FirebaseAPI.getLogPath();
        let filter  = {
            orderby  : "date",
            lessThan : this.getToday()
        }
        let pushData = (date,data) => {
            logList.push({
                content : date,
                data    : [data]
            })
        }

        await FirebaseAPI.getData(logPath , "" , filter).then(logs => {
            logs.reverse().forEach(log => {
                const {classroom , group , name , type , id , date} = log
                const dataLength = logList.length;

                let data = {classroom , group , name , type , id}

                //whether or not log list has the element 
                if(dataLength !== 0){
                    let now = logList[dataLength - 1];

                    //whether or not the date of this log same as the previous one 
                    if(now.content === date){
                        now.data.push(data); 
                    }else{
                        pushData(date,data)
                    }

                }else{
                    pushData(date,data)
                }
            })
        });
        return logList;
    }

    /**
     * Return the Classrooms from the firebase.
     * The following is the structure of an element in the return value,
     * {
     *  content : {Because the classrooms list no need to separate,this value always is null.}
     *  data    : {classroom information}
     * }
     * the other one is the structure of classroom element,
     * {
     *  name    : {classroom name}
     *  normal  : {Whether or not the classroom provide normal course}
     *  special : {Whether or not the classroom provide special course}
     *  money   : {Whether or not the student needs to pay money for this classroom}
     *  id      : {classroom id}
     * }
     * @returns {Array}
     */
    getClassroomsRowData = async () => {
        let classroomList = [{
            content : null,
            data    : []
        }]
        let classroomPath = FirebaseAPI.getClassroomPath();

        await FirebaseAPI.getData(classroomPath).then(classrooms => {
            Object.keys(classrooms).forEach(id => {
                const {name , normal , special , money , user} = classrooms[id]

                let classroom = {name , normal , special , money , id , user}

                classroomList[0].data.push(classroom)
            })
        });
        return classroomList;
    }

    /**
     * Return the specified classroom information from the firebase
     * @param   {String} id classroom id
     * @returns {Object}
     */
    getClassroomData = async id => {
        let classroom;
        let classroomPath = FirebaseAPI.getClassroomPath(id)

        await FirebaseAPI.getData(classroomPath).then(info => {
            classroom = {...info , id}
        })

        return classroom;
    }

    /**
     * Return the users from the firebase
     * The following is the structure of an element in the return value,
     * {
     *  content  : {Because the users list no need to separate,this value always is null.}
     *  data     : {user information}
     * }
     * the other one is the structure of user element,
     * {
     *  username : {user username}
     *  password : {user password}
     *  role     : {user role ,there are admin and normal role}
     *  id       : {user username}
     * }
     * @returns 
     */
    getUserRowData = async () => {
        let userList = [{
            content : null,
            data    : []
        }]
        let userPath = FirebaseAPI.getUserPath();
        
        await FirebaseAPI.getData(userPath).then(users => {
            Object.keys(users).forEach(id => {
                const {username , password , role} = users[id]

                let user = {username , password , role , id}

                userList[0].data.push(user)
            })
        });
        return userList;
    }

    /**
     * Return the specified user information from the firebase
     * @param   {String} username user username
     * @returns {Object}
     */
    getUserData = async username => {
        let user;
        let userPath = FirebaseAPI.getUserPath(username);

        await FirebaseAPI.getData(userPath).then(info => {
            user = {...info};
        })

        return user;
    }
    
    /**
     * Return the specified student information from the firebase
     * @param   {String} id      student id
     * @param   {String} idGroup group id
     * @returns {Object}
     */
    getStudentDate = async (id , idGroup) => {
        let student     = {}
        let groupPath   = FirebaseAPI.getGroupPath(idGroup);
        let studentPath = FirebaseAPI.getStudentPath(idGroup);

        await FirebaseAPI.getData(groupPath , "name").then(async groupName => {

            await FirebaseAPI.getData(studentPath , id).then(info => {
                student = {group : groupName , ...info , id};
            });
            
        });

        return student;
    }

    /**
     * Return the specified student roll call logs from the firebase
     * The following is the structure of an element in the return value,
     * {
     *  content  : {Because the student roll call logs no need to separate,this value always is null.}
     *  data     : {student log information}
     * }
     * the other one is the structure of classroom element,
     * {
     *  date      : {date}
     *  classroom : {classroom name}
     *  type      : {class type,normal or special}
     *  id        : {log id}
     * }
     * @param   {String} id 
     * @returns {Array}
     */
    getPersonalLogRowData = async id => {
        let logList = [{
            content : null,
            data    : []
        }]
        let filter = {
            orderby : "id",
            equalTo : id
        }
        let logPath = FirebaseAPI.getLogPath()

        await FirebaseAPI.getData(logPath , "" , filter).then(logs => {

            logs.reverse().forEach(log => {
                const {date , classroom , type , id} = log;

                let data = {date , classroom , type , id}

                logList[0].data.push(data);
            })
        });

        logList[0].data.sort((a , b) => {
            let aDate =  new Date(a.date).getTime()
            let bDate =  new Date(b.date).getTime()
            return bDate - aDate;
        })

        return logList;
    }

    /**
     * Check if the username and password are correct
     * @param   {String} username 
     * @param   {String} password 
     * @returns {Number | String}
     */
    login = async (username , password) => {
        let result = 200;

        //Check if the username only specified character
        if(/^[a-zA-Z0-9]*$/.test(username)){
            let userPath = FirebaseAPI.getUserPath(username);

            await FirebaseAPI.getData(userPath , "password").then(pw => {

                if(pw === null){
                    result = "????????????";
                }else if(pw !== password){
                    result = "????????????"
                }

            })

        }else{
            result = "????????????????????????"
        }
        return result;
    }

    /**
     * Post student roll call log to firebase
     * @param {Object} date date
     * @param {Object} classroom classroom information 
     * @param {String} classType class type, normal or special
     * @param {Array} students students list
     */
    postSignInLog = async (date , classroom , classType , students) => {
        for(let student of [...students]){ 
            await FirebaseAPI
                    .getData(FirebaseAPI.getGroupPath(student.idGroup),"name")
                    .then(async name => {
                        let data = {
                            date        : date, 
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

    /**
     * Update student roll call times
     * @param {String} studentId student id
     * @param {String} groupId group id
     * @param {String} classType class type, normal or special
     */
    updateStudentLogNum = (studentId , groupId , classType) => {
        let studentPath = FirebaseAPI.getStudentPath(groupId);

        FirebaseAPI.getData(studentPath , studentId).then(async info => {
            const {specialNum , normalNum} = info;
            await FirebaseAPI.updateData(studentPath , studentId,{
                specialNum  : specialNum + (classType === "??????"), 
                normalNum   : normalNum  + (classType === "??????")
            })
        })
    }

    /**
     * Update all students money field, make them change to false 
     */
    updateAllStudentMoney = async () => {
        let groupPath = FirebaseAPI.getGroupPath();

        await FirebaseAPI.getData(groupPath).then(groups => {
            
            Object.keys(groups).forEach(key => {
                let group       = groups[key];
                let studentPath = FirebaseAPI.getStudentPath(key);

                if(group.student){
                    Object.keys(group.student).forEach(id => {
                        FirebaseAPI.updateData(studentPath , id , {
                            money : false
                        })
                    })
                }
            })
        });
    } 
    
    /**
     * post a new student to firebase
     * @param {Object} data student data
     */
    postStudent = async data => {
        var {id , name} = data.group

        let defaultValue = {
            group       : name,
            normalNum   : 0,
            specialNum  : 0
        }
        data = {...data , ...defaultValue}

        let postData = (path) => {
            let studentPath = FirebaseAPI.getStudentPath(path);
            FirebaseAPI.postData(studentPath , data)
        }
        
        //id is null means this group is a new group,
        //need to post group before post student.
        if(!id){
            this.postGroup(name).then(d => postData(d.key));
        }else{
            postData(id)
        }
    }

    /**
     * update the student data
     * @param {Object} newData 
     * @param {Object} oldData 
     * @returns {String} new group key , if student not change group or change to exist group,return null.
     */
    updateStudent = async(newData , oldData) => {
        let tempGroupId = null;
        let myNewData = {...newData}
        let myOldData = {...oldData}
        const {name : newName , id : newId} = myNewData.group;
        const {name : oldName , id : oldId} = myOldData.group;

        let updateDate = async path => {
            let studentPath = FirebaseAPI.getStudentPath(path);
            await FirebaseAPI.updateData(studentPath , myNewData.id , myNewData);
        }

        let removeDate = async () => {
            let StudentPath = FirebaseAPI.getStudentPath(oldId);
            await FirebaseAPI.removeData(StudentPath , myOldData.id)
        }
        
        myNewData.group = newName;

        //if the old group name and new group name are different,
        //move the student to new group.
        if(newName === oldName){
            updateDate(newId)
        }else{
            //id is null means this group is a new group,
            //need to post group before post student.
            if(!newId){
                await this.postGroup(newName).then(d => {
                    tempGroupId = d.key;

                    updateDate(d.key);
                    removeDate();
                });
            }else{
                updateDate(newId);
                removeDate();
            }
        }
        return tempGroupId
    }

    /**
     * remove the student data
     * @param {String} studentId student id
     * @param {String} groupId group id
     */
    removeStudent = async(studentId , groupId) => {
        let studentPath = FirebaseAPI.getStudentPath(groupId); 
        await FirebaseAPI.removeData(studentPath , studentId);
    }

    /**
     * 
     * Return the groups and brief data of students which name is match the search text from the firebase.
     * The following is the structure of an element in the return value,
     * {
     *  content : {group name}
     *  id      : {group id}
     *  data    : {student information}
     * }
     * the other one is the structure of student element,
     * {
     *  name    : {student name},
     *  normal  : {the times of normal classroom roll call},
     *  special : {the times of special classroom roll call},
     *  total   : {the times of all classroom roll call},
     *  money   : {whether or not student pay money},
     *  id      : {student id},
     *  idGroup : {group id},
     * }
     * @param   {String} searchText search text
     * @returns {Array}
     */
    searchGroupRowData = async searchText => {
        let groupList = [];
        let groupPath = FirebaseAPI.getGroupPath();

        await FirebaseAPI.getData(groupPath).then(groups => {

            Object.keys(groups).forEach(key => {
                let group = groups[key];
                let data  = [];

                if(group.student){

                    Object.keys(group.student).forEach(id => {
                        let student = group.student[id];

                        //match search text
                        if(student["name"].includes(searchText)){
                            const {name , normalNum , specialNum , money} = student;
                            let studentData = {
                                name,
                                normal  : normalNum,
                                special : specialNum,
                                total   : normalNum + specialNum,
                                money,
                                id,
                                idGroup : key
                            }
                            data.push(studentData);
                        }
                    })
                }
                groupList.push({
                    content : group.name,
                    id      : key,
                    data
                })
            })
        });
        return groupList;
    }

    /**
     * remove student roll call log
     * @param {String} logId 
     */
    removePersonalLog = async logId => {
        let logPath = FirebaseAPI.getLogPath();
        await FirebaseAPI.removeData(logPath , logId);
    }

    /**
     * post a new classroom
     * @param {Object} data 
     */
    postClassroom = async data => {
        let classroomPath = FirebaseAPI.getClassroomPath();
        await FirebaseAPI.postData(classroomPath , data);
    }

    /**
     * update the classroom data
     * @param {Object} data 
     */
    updateClassroom = async data => {
        let classroomPath = FirebaseAPI.getClassroomPath();
        await FirebaseAPI.updateData(classroomPath , data.id , data)
    }

    /**
     * remove the classroom
     * @param {String} classroomId 
     */
    removeClassroom = async classroomId => {
        let classroomPath = FirebaseAPI.getClassroomPath();
        await FirebaseAPI.removeData(classroomPath , classroomId)
    }

    /**
     * update user password
     * @param {*String} password 
     */
    updatePassword = async password => {
        let userPath = FirebaseAPI.getUserPath();
        await FirebaseAPI.updateData(userPath , this.username , {password})
    }

    /**
     * remove user
     */
    removeUser = async () => {
        let userPath = FirebaseAPI.getUserPath();
        await FirebaseAPI.removeData(userPath , this.username)
    }

    /**
     * post a new user
     * @param {Object} data 
     */
    postUser = async (data = {}) => {
        let userPath = FirebaseAPI.getUserPath(data.username);
        await FirebaseAPI.postData(userPath , data , true)
    }

    /**
     * post a new group
     * @param {String} name 
     * @returns 
     */
    postGroup = async (name) => {
        let groupPath = FirebaseAPI.getGroupPath();
        let newId;
        newId = await FirebaseAPI.postData(groupPath , {name})
        return newId;
    }

    /**
     * remove the group
     * @param {String} groupId 
     */
    removeGroup = async(groupId) => {
        let groupPath = FirebaseAPI.getGroupPath();
        await FirebaseAPI.removeData(groupPath , groupId)
    }

    /**
     * Return student page table head information
     * @returns {Array}
     */
    getGroupHeadFields = () => {
        let headField = [
            [{
                name        : "??????",
                className   : "name",
                width       : "30%"
            }],
            [{
                name        : "??????",
                className   : "normal"
            }],
            [{
                name        : "??????",
                className   : "special"
            }],
            [{
                name        : "??????",
                className   : "title"
            }],
            [{
                name        : "??????",
                className   : "money",
                width       : "15%"
            }]
        ];
        return headField;
    }
    
    /**
     * Return student form field information
     * @returns {Array}
     */
    getGroupFormFields = () => {
        let formField = [
            {
                type        : "text",
                name        : "name",
                label       : "??????",
                placeholder : "?????????"
            },{
                type        : "button",
                name        : "startDate",
                label       : "????????????"
            },{
                type        : "button",
                name        : "group",
                label       : "??????"
            },{
                type        : "text",
                name        : "introducer",
                label       : "?????????",
                placeholder : "?????????"
            },{
                type        : "text",
                name        : "relationship",
                label       : "??????",
                placeholder : "??????"
            },{
                type        : "text",
                name        : "city",
                label       : "?????????",
                placeholder : "??????"
            },{
                type        : "text",
                name        : "career",
                label       : "??????",
                placeholder : "??????"
            },{
                type        : "radio",
                name        : "money",
                label       : "??????????????????",
                options     : [{
                    name    : "true",
                    label   : "???"
                },{
                    name    : "false",
                    label   : "???"
                }]
            },{
                type        : "text",
                name        : "reason",
                label       : "????????????",
                placeholder : "???????????????......"
            }
        ]
        return formField;
    }

    /**
     * Return user form field information
     * @returns {Array}
     */
    getUserFormFields = () => {
        let formField = [
            {
                type        : "text",
                name        : "username",
                label       : "??????",
                placeholder : "username"
            },{
                type        : "text",
                name        : "password",
                label       : "??????",
                placeholder : "password"
            },{
                type        : "radio",
                name        : "role",
                label       : "??????",
                options     : [{
                    name    : "normal",
                    label   : "??????"
                },{
                    name    : "admin",
                    label   : "?????????"
                }]
            }
        ]
        return formField;
    }

    /**
     * Return log page table head information
     * @returns {Array}
     */
    getLogHeadFields = () => {
        let headField = [
            [{
                name        : "??????",
                className   : "classroom"
            }],
            [{
                name        : "??????",
                className   : "group"
            }],
            [{
                name        : "??????",
                className   : "student"
            }],
            [{
                name        : "??????",
                className   : "type"
            }]
        ];
        return headField;
    }

    /**
     * Return classroom page table head information
     * @returns {Array}
     */
    getClassroomHeadFields = () => {
        let headField = [
            [{
                name         : "??????",
                className    : "name",
                rowSpan      : 2
            }],
            [
                {
                    name        : "????????????",
                    className   : "type",
                    colSpan     : 2,
                    width       : "30%"
                },
                {
                    name        : "??????",
                    className   : "normal"
                }
            ],
            [
                null,
                {
                    name        : "??????",
                    className   : "special"
                }
            ],
            [{
                name         : "????????????",
                className    : "money",
                rowSpan      : 2,
                width        : "25%"
            }]
        ];
        return headField;
    }

    /**
     * Return classroom form field information
     * @returns {Array}
     */
    getClassroomFormFields = () => {
        let formField = [
            {
                type    : "text",
                name    : "name",
                label   : "??????"
            },{
                type    : "checkbox",
                name    : "type",
                label   : "????????????",
                options : [{
                    name    : "normal",
                    label   : "????????????"
                },{
                    name    : "special",
                    label   : "????????????"
                }]
            },{
                type    : "radio",
                name    : "money",
                label   : "??????????????????",
                options : [{
                    name    : "true",
                    label   : "???"
                },{
                    name    : "false",
                    label   : "???"
                }]
            },{
                type    : "button",
                name    : "user",
                label   : "????????????"
            }
        ]
        return formField;
    }

    /**
     * Return student log page table head information
     * @returns {Array}
     */
    getPersonalLogHeadFields = () => {
        let headField = [
            [{
                name        : "??????",
                className   : "date"
            }],
            [{
                name        : "??????",
                className   : "classroom"
            }],
            [{
                name        : "??????",
                className   : "type",
                width       : "20%"
            }],
            [{
                name        : "??????",
                className   : "delete",
            }]
        ];
        return headField;
    }

    /**
     * Return student page table head information
     * @returns {Array}
     */
    getPersonalHeadFields = () => {
        const labels = [
            {
                label   : "??????",
                name    : "name"
            },{
                label   : "????????????",
                name    : "startDate"
            },{
                label   : "??????",
                name    : "group"
            },{
                label   : "?????????",
                name    : "introducer"
            },{
                label   : "??????",
                name    : "relationship"
            },{
                label   : "?????????",
                name    : "city"
            },{
                label   : "??????",
                name    : "career"
            },{
                label   : "??????????????????",
                name    : "money"
            },{
                label   : "????????????",
                name    : "reason"
            }
        ];
        return labels;
    }
    
    /**
     * Return user page table head information
     * @returns {Array}
     */
    getUserHeadFields = () => {
        let headField = [
            [{
                name        : "??????",
                className   : "username"
            }],
            [{
                name        : "??????",
                className   : "password"
            }],
            [{
                name        : "??????",
                className   : "role"
            }]
        ];
        return headField;
    }

    
}
export default new signInAPI()
