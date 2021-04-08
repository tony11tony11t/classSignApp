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

    getData = async (ref,key) => {
        let result = [];
        let dbRef = this.database.ref(`${ref}${key || ""}`);

        if(ref === "/log/"){
            dbRef = dbRef.orderByChild('date');
        }

        await dbRef.once("value", e => {
            if(ref === "/log/"){
                e.forEach(el => {
                    result.push({...el.val() , id : el.key});
                });
            }else{
                result = e.val();
            }
        });
        return result;
    }

    postClassroom = (name,normal,special,money) => {
        this.database.ref('/classrooms').push().set({name,normal,special,money})
    }
    postLog = (date,classroom,group,name,type) => {
        this.database.ref('/log').push().set({date,classroom,group,name,type})
    }
    postStudent = (name,startDate,group,introducer,relationship,city,career,money,reason) => {
        let refGroup = this.database.ref('/group').orderByChild("name").equalTo(group);
        refGroup.once("value",e => {
            let groupKey;

            if(e.val()){
                groupKey = Object.keys(e.val())[0];  
            }else{
                groupKey = this.database.ref('/group').push({name:group}).key;  
            }

            let groupRef = this.database.ref(`/group/${groupKey}/student`);
            groupRef.push({name,startDate,introducer,relationship,city,career,money,reason,normalNum : 0,specialNum : 0})
        });
    }
}

export default new FirebaseAPI()