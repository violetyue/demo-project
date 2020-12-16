import axios from 'axios'
import qs from 'qs'

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



export function login(data) {
    return post('user/v1/users/_login',data);
}


export function getUserInfo(data) {
    return get('user/v1/user',data);
}

export const getOrgUserList = (params) => {
    return get(`liteman/v1/user/list`, params);
};

export function addUser(data) {
    return post(`user/v1/users`, data);
}

// export function addUser(data) {
//     return request.post(`${baseUrl}/users`, data);
// }

// export function editUser(id: number, params: any) {
//     return request.patch(`${baseUrl}/users/${id}`, params);
// }

// export function changeUserPassword(params, config = {}) {
//     return request.post(`${baseUrl}/users/_changePassword`, params, config);
// }

// // 停用用户
// export function disabledUser(id: string | number) {
//     return request.delete(`${baseUrl}/users/${id}/enabled`);
// }

// // 启用用户
// export function enabledUser(id: string | number) {
//     return request.put(`${baseUrl}/users/${id}/enabled`);
// }