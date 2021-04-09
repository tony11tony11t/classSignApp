import firebase from 'firebase';
import config from './config';

class FirebaseAPI{

    constructor() {
        if (!firebase.apps.length) {
            this.app = firebase.initializeApp(config);
        } else {
            this.app = firebase.app();
        }
        this.database = this.app.database();
    }

    getClassroomPath = id => `/classrooms/${id || ""}/`
    
    getUserPath = username => `/user/${username || ""}/`

    getLogPath = () => `/log/`

    getGroupPath = idGroup => `/group/${idGroup || ""}/`

    getStudentPath = idGroup => `${this.getGroupPath()}${idGroup}/student/`

    getData = async (ref,key,filter = {}) => {
        let result = [];
        let dbRef = this.database.ref(`${ref}${key || ""}`);
        let defaultFilter = {
            orderby : null,
            lessThan : null,
            moreThan : null,
            equalTo : null
        }
        filter = Object.assign(defaultFilter , filter);

        if(filter.lessThan){
            dbRef = dbRef.startAt(filter.lessThan);
        }
        if(filter.moreThan){
            dbRef = dbRef.endAt(filter.moreThan);
        }
        if(filter.equalTo){
            dbRef = dbRef.equalTo(filter.equalTo);
        }
        if(filter.orderby){
            dbRef = dbRef.orderByChild(filter.orderby);
            await dbRef.once("value", e =>{
                e.forEach(el => {
                    result.push({...el.val() , id : el.key});
                });
            });
        }else{
            await dbRef.once("value", e => {
                result = e.val()
            });
        }
        return result;
    }

    postClassroom = (name,normal,special,money) => {
        this.database.ref('/classrooms').push().set({name,normal,special,money})
    }
    postLog = async (date,classroom,group,name,id,type) => {
        await this.database.ref('/log').push().set({date,classroom,group,name,id,type})
    }
    postStudent = async (name,startDate,group,introducer,relationship,city,career,money,reason) => {
        let refGroup = this.database.ref('/group').orderByChild("name").equalTo(group);
        let groupRef , groupKey;
        await refGroup.once("value",async e => {

            if(e.val()){
                groupKey = Object.keys(e.val())[0];  
            }else{
                groupKey = this.database.ref('/group').push({name:group}).key;  
            }
        });
        groupRef = this.database.ref(`/group/${groupKey}/student`);
        await groupRef.push({name,startDate,introducer,relationship,city,career,money,reason,normalNum : 0,specialNum : 0})
    }
}

export default new FirebaseAPI()