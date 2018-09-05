import axios from "axios"
import router from "../router"
import store from "../store"
import { Message } from 'element-ui';

const Axios = axios.create({
    baseURL: process.env.NODE_ENV == "production" ? 'https://www.runcuo.com/api/' : 'http://localhost:8080/api/',
    timeout: 30000,
    //responseType: "json",
    //withCredentials: true, // 是否允许带cookie这些
    headers: {
    }
})

Axios.interceptors.request.use(
    config => {
        // 用户未登录，跳转登录页
        if (router.currentRoute.meta.requireLogin && !store.state.user) {
            router.push({
                path: "/login"
            });
        }

        // 如果用户已登录，加上 Authorization 头
        if (store.state.user) {
            config.headers.Authorization = store.state.user.Token;
        }

        return config;
    },
    error => {
        // 请求错误拦截器
        Message.error("请求失败：" + (error.data ? error.data : "未知错误。"))
        return Promise.reject(error.data);
    }
);

//返回状态判断(添加响应拦截器)
Axios.interceptors.response.use(
    res => {
        //对响应数据做些事
        if (typeof (res.data) != "object" && res.status > 299) {
            Message.error("请求失败：" + (res.data ? res.data : "未知错误。"))
            return Promise.reject(res.data);
        }
        return res;
    },
    error => {
        if (error.response == undefined) {
            Message.error("请求失败：网络错误请重试。")
            return Promise.reject('网络错误请重试');
        }
        // 需要重新登录
        if (error.response.status === 401) {
            store.commit('CLEAR')
            // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
            router.push({
                path: "/login"
            });
        } else {
            // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
            Message.error(error.response.data)
        }
        // 返回 response 里的错误信息
        let errorInfo = error.response.data ? error.response.data : '未知错误';
        return Promise.reject(errorInfo);
    }
);

// The polling function
function _poll(fn, timeout, interval) {
    var endTime = Number(new Date()) + (timeout || 2000);
    interval = interval || 100;

    var checkCondition = function (resolve, reject) {
        var ajax = fn();
        // dive into the ajax promise
        ajax.then(function (response) {
            // If the condition is met, we're done!
            if (response.status == 200) {
                resolve(response);
            }
            // If the condition isn't met but the timeout hasn't elapsed, go again
            else if (Number(new Date()) < endTime) {
                setTimeout(checkCondition, interval, resolve, reject);
            }
            // Didn't match and too much time, reject!
            else {
                reject(new Error('轮询超时 ' + fn + ': ' + arguments));
            }
        });
    };

    return new Promise(checkCondition);
}

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
    install: function (Vue, Option) {
        Object.defineProperty(Vue.prototype, "$http", { value: Axios });
    }
};