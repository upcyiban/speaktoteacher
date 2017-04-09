/**
 * Created by lylllcc on 2017/4/3.
 */

login(config.serverurl, config.appid,config.callback);
judeIsTeacher(config.serverroot,config.serverurl,config.fronturl);

function judeIsTeacher(serverroot,serverurl,fronturl) {
    Vue.http.get(serverroot + '/userinfo/getid').then((response)=> {
        if(response.data == -1){
            console.log("没有登陆");
            login();
            return ;
        }
        let ybid = response.data;
        Vue.http.get(serverurl + '?ybid=' + ybid).then((response)=> {
            if(response.data == false)
                window.location.href = fronturl;
        })

    })
}
var createqrcode = new Vue({
    el: '.qrcode',
    data:{
        qrcodeurl: ''
    },
});
Vue.http.get(config.serverurl + '/createqrcode').then((response)=> {
    createqrcode.qrcodeurl = response.data.message
});

var info = new Vue({
    el: '.info',
    data:{
        name: '',
        email: '',
        motto: '',
        phonenumber: '',
        profile: ''
    },
    methods:{
        change: function () {
            Vue.http.get(config.serverurl + '/update?profile=' + info.profile + '&motto=' + info.motto + '&phonenumber=' + info.phonenumber + '&email=' + info.email).then((response)=> {
                    if(response.data.code != 1){
                        alert("修改失败，请稍后再试");
                        return ;
                    }
            });
            alert('修改成功')
        }
    }
});

let teacherid  = sessionStorage.getItem("ybid");
Vue.http.get(config.serverurl + '/getteacher?yibanId=' + teacherid).then((response)=> {
    info.name = response.data.name;
    info.email = response.data.email;
    info.motto = response.data.motto;
    info.phonenumber = response.data.phonenumber;
    info.profile = response.data.profile;
    info.yibanId = response.data.yibanId;
});

var reply = new Vue({
    el: '.reply',
    data:{
        messages: []
    },
    methods:{
        re: function (id) {
            var replymes = document.getElementById(id).value;
            Vue.http.get(config.serverurl + '/reply?id=' + id + '&reply=' + replymes).then((response)=> {
                    if(response.data.code == 1)
                        alert('回复成功');
            });

        }
    }
});

Vue.http.get(config.serverurl + '/listmessage').then((response)=> {
    reply.messages = response.data;
    console.log(response.data);
});


