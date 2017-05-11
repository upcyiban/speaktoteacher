/**
 * Created by lylllcc on 2017/5/7.
 */

login(config.serverurl, config.appid, config.callback);

let allteacher = new Vue({
    el: '#all',
    data: {
        teachers: '',
    },
});


Vue.http.get(config.serverurl + '/listteacher').then((response) => {
    allteacher.teachers = response.data;

    for(let i = 0;i<allteacher.teachers.length; i++){
        allteacher.teachers[i].qrcode = allteacher.teachers[i].qrcode.split('text=')[1];
    }
});



