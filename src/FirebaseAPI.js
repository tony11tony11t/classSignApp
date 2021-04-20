import firebase from 'firebase';
import config   from './config';

class FirebaseAPI{

    constructor() {
        //initialize firebase
        if (!firebase.apps.length) {
            this.app = firebase.initializeApp(config);
        } else {
            this.app = firebase.app();
        }
        this.database = this.app.database();
    }

    /**
     * Return path of the classroom
     * @param   {String} id 
     * @returns {String}
     */
    getClassroomPath = id        => `/classrooms/${id || ""}/`

    /**
     * Return path of the user
     * @param   {String} username 
     * @returns {String}
     */
    getUserPath      = username  => `/user/${username || ""}/`

    /**
     * Return path of the log
     * @returns {String}
     */
    getLogPath       = ()        => `/log/`

    /**
     * Return path of the group
     * @param   {String} idGroup 
     * @returns {String}
     */
    getGroupPath     = idGroup   => `/group/${idGroup || ""}/`

    /**
     * Return path of the specified student
     * @param   {String} idGroup 
     * @returns {String}
     */
    getStudentPath   = idGroup   => `${this.getGroupPath()}${idGroup}/student/`

    /**
     * Return the specified data from the firebase
     * @param   {String} path data path
     * @param   {String} key specified data key or id
     * @param   {Object} filter the rules of getting data, four conditions can be chosen
     * @returns {Array}
     */
    getData = async (path , key , filter = {}) => {

        let result  = [];
        let dbRef   = this.database.ref(`${path}${key || ""}`);

        filter = {
            orderby     : null,
            lessThan    : null,
            moreThan    : null,
            equalTo     : null,
            ...filter
        };

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
            await dbRef.once("value", allData => {
                allData.forEach(data => {
                    result.push({...data.val() , id : data.key});
                });
            });
        }else{
            await dbRef.once("value", allData => {
                result = allData.val()
            });
        }
        return result;
    }

    /**
     * Post data to firebase
     * @param   {String}  path data path
     * @param   {String}  key  specified data key or id
     * @param   {boolean} set if true, use the set function to post data, the set function will not auto-generate the id
     */
    postData = async (path , data , set = false) => {

        let ref = this.database.ref(path);

        return await set ? ref.set(data) : ref.push(data);

    }

    /**
     * Update data and post to firebase
     * @param  {String}  path data path
     * @param  {String}  key  specified data key or id
     * @param  {Object}  data data that has been updated
     */
    updateData = (path , key , data) => {
        this.database.ref(`${path}${key || ""}`).update(data);
    }

    /**
     * Remove data from the firebase
     * @param  {String}  path data path
     * @param  {String}  key  specified data key or id
     */
    removeData = (path , key) => {
        this.database.ref(`${path}${key || ""}`).remove();
    }
}

export default new FirebaseAPI()