/**
 * Created by lylllcc on 2017/4/3.
 */

//存老师id
let href = window.location.href;
if(href.split('?').length == 2 && href.split('?')[1].split('=')[0] == 'id'){
    let teacherid = href.split('?')[1].split('=')[1];
    sessionStorage.setItem("teacherid",teacherid);
}
login(config.serverurl,config.appid,config.callback);


var info = new Vue({
    el: '.info',
    data: {
        email: '',
        imgurl: '',
        motto: '',
        name: '',
        phonenumber: '',
        profile: '',
        recommend: ''
    }
});

var img = new Vue({
    el: '#img',
    data: {
        imgurl: '',
    }
});

let teacherid  = sessionStorage.getItem("teacherid");
teacherid = teacherid ? teacherid : '';
Vue.http.get(config.serverurl + '/getteacher?yibanId=' + teacherid).then((response)=> {
    info.email = response.data.email;
    img.imgurl = response.data.imgurl;
    info.imgurl = response.data.imgurl;
    info.motto = response.data.motto;
    info.name = response.data.name;
    info.phonenumber = response.data.phonenumber;
    info.profile = response.data.profile;
    info.recommend = response.data.recommend;
});
/*
留言
 */
var leavemsg = new Vue({
    el: '#msg',
    data:{
      message: ''
    },
    methods:{
        send: function () {
            let teacherid = sessionStorage.getItem("teacherid");
            teacherid = teacherid ? teacherid : '';
            Vue.http.get(config.serverurl + '/createmessage?content=' + this.message + '&teacherYBId=' + teacherid).then((response)=> {
                    if(response.data.code == 1){
                        alert("留言成功");
                        console.log("给" + teacherid + "留言");
                        this.message = ''
                    }else {
                        alert("留言失败");
                    }
            });


        }
    }
});
/*
回复的消息
 */
let replymesage = new Vue({
    el: '#reply',
    data:{
        message: []
    }
});

Vue.http.get(config.serverurl + '/showmessage?teacherId=' + teacherid).then((response)=> {
    replymesage.message = response.data;
    console.log(replymesage.message)
});

getId(config.serverroot)





