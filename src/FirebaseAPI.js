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

    getClassroomPath    = id        => `/classrooms/${id || ""}/`
    getUserPath         = username  => `/user/${username || ""}/`
    getLogPath          = ()        => `/log/`
    getGroupPath        = idGroup   => `/group/${idGroup || ""}/`
    getStudentPath      = idGroup   => `${this.getGroupPath()}${idGroup}/student/`

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
            dbRef = dbRef.endAt(filter.lessThan);
        }
        if(filter.moreThan){
            dbRef = dbRef.startAt(filter.moreThan);
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

    postData = async (ref , data) => {
        await this.database.ref(ref).push(data);
    }

    updateData = (ref , key , data) => {
        this.database.ref(`${ref}${key || ""}`).update(data);
    }

    removeData = (ref , key) => {
        this.database.ref(`${ref}${key || ""}`).remove();
    }

    postClassroom = (name,normal,special,money) => {
        this.database.ref('/classrooms').push().set({name,normal,special,money})
    }

}

export default new FirebaseAPI()