import axios from 'axios'


axios.defaults.baseURL= "https://api2-feature.blacklake.cn/api/"
axios.defaults.timeout = 10000;

axios.interceptors.response.use(function (response) {
    return response
}, function (error) {
    const errorInfo = JSON.stringify(error)
    if (errorInfo.indexOf('401')>-1){
        console.log('登录失效，请重新登录！')
    }else if (errorInfo.indexOf('500')>-1){
        console.log('500网络问题，请稍后重试！')
    }else if(errorInfo.indexOf('400')){
        console.log(error)
    }
    return Promise.reject(error);
})

export function deleted(url,data = {}){
    return new Promise((resolve,reject) => {
        let type = {
            headers: {
                "x-auth": window.localStorage.getItem("auth"),
                'x-client': 'lite-app',
            }};
        axios.delete(url,type)
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

export function post(url,data = {}){

    return new Promise((resolve,reject) => {
        let type = {
            headers: {
                'Content-Type': 'application/json',
                "x-auth": window.localStorage.getItem("auth"),
                'x-client': 'lite-app',
            }};
        axios.post(url,data,type).then(response => {
            resolve(response.data);
        },err => {
            reject(err)
        })
    })
}
export function postUpload(url,data = {}){
    return new Promise((resolve,reject) => {
        let type = {
            headers: {'Content-Type': 'multipart/form-data',
                "x-auth": window.localStorage.getItem("auth"),
                'x-client': 'lite-app',
            }};
        axios.post(url,data,type).then(response => {
            resolve(response.data);
        },err => {
            reject(err)
        })
    })
}

export function get(url,data){
    let headers = {'Content-Type': 'application/json',
        "x-auth": window.localStorage.getItem("auth"),
        'x-client': 'lite-app'};
    return new Promise((resolve,reject) => {
        axios.get(url,{params:data,headers:headers})
            // axios.get(url,{params:data})
            .then(response => {
                resolve(response.data);
            },err => {
                reject(err)
            })
    })
}

//用户
export function login(data) {
    return post('user/v1/users/_login',data);
}
export function getUserInfo(data) {
    return get('user/v1/user',data);
}
export function getUserList(param) {
    return get(`user/v1/users`, param)
}
export function addUser(user) {
    return post(`user/v1/users`, user);
}
// export function editUser(id) {
//     return patch(`user/v1/users/${id}`)
// }
export function blockUser(id) {
    return deleted(`user/v1/users/${id}/enabled`)
}
// export function enableUser(id) {
//     return put(`user/v1/users/${id}/enabled`)
// }
export function changePassword(user) {
    return post('user/v1/users/_changePassword', user)
}
export function getUserRoles(user) {
    return get('user/v1/roles', user)
}


//单位
export function getUnitList (param) { 
    return post('liteman/v1/unit/_search', param);
}
export function compileUnit(unit) {
    return post('liteman/v1/unit/_update', unit);
}
export function insertUnit(unit) {
    return post('liteman/v1/unit/_insert', unit)
}
export function deleteUnit(id) {
    return deleted(`liteman/v1/unit/${id}/_delete`)
}

// 次品项
export function getinferiorQuality (param) {
    return post('liteman/v1/defectType/_list', param)
}
export function insertinferiorQuality(quality) {
    return post('liteman/v1/defectType/_insert', quality)
}
export function compileferiorQuality(quality) {
    return post('liteman/v1/defectTypr/_update', quality)
}
export function deleteinferiorQuality(id) {
    return deleted(`liteman/v1/defectType/${id}/_delete`)
}
