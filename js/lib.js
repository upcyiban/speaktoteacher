/**
 * Created by lylllcc on 2017/4/3.
 */
/**
 * vue cookie 跨域
 */
Vue.http.interceptors.push((request, next) => {
    request.credentials = true;
    next()
});

/**
 * 易班授权认证
 */
function login(serverurl, appid, callback) {
    let url = window.location.href;
    if (url.indexOf("verify_request") != -1) {
        let vq = window.location.href.split('=')[1].split('&')[0];
        if (vq != '') {
            Vue.http.get(serverurl + '/auth?vq=' + vq).then((response)=> {
                console.log(response.data)
                if(response.data == 1){
                    let index = url.indexOf('?');
                    let redrect = url.substring(0,index - 1);
                    window.location.href = redrect;
                }
            });
        }
    }
    Vue.http.get(serverurl + '/isauth').then((response)=> {
        if (response.data == 0) {
            window.location.href = "https://openapi.yiban.cn/oauth/authorize?client_id=" + appid+ "&redirect_uri=" + callback + "&display=html"
        }
    });
}

/**
 * 获取易班id
 */
function getId(serverroot) {
     Vue.http.get(serverroot + '/userinfo/getid').then((response)=> {
         if(response.data == -1){
             console.log("没有登陆");
             login();
         }
         console.log('ybid' + response.data);
         sessionStorage.setItem('ybid',response.data);
         return response.data;
     })
}