import axios from "axios"
import router from "../router";
import auth from "./auth"

const BASE_URL = "http://127.0.0.1:8000";

class Http {
    constructor() {
        this.http = axios.create({
            baseURL: BASE_URL
        });

        //インターセプト、JWT処理用
        this.http.interceptors.request.use(config => {
            const token = auth.token;
            if (token && token !== "undefined") {
                config.headers.common.Authorization = "JWT " + token
            }
            return config
        });

        //code == 403の場合、/loginにリダイレクト
        this.http.interceptors.response.use(null, err => {
            if (err && err.response && err.response.status === 403){
                auth.clearUserToken();
                router.replace("/login")
            }
            return Promise.reject(err)
        });
    }
    login(params){
        const url = "/auth/login";
        return this.http.post(url, params)
    }
}

export default new Http();
