import axios from "axios"
import router from "../router";
import auth from "./auth"

const BASE_URL = "http://127.0.0.1:8000";

class Http {
    constructor() {
        this.http = axios.create({
            baseURL: BASE_URL
        });

        //インターセプト、JWTをリクエストに追加用
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
    addProject(params){
        const url= "/project";
        return this.http.post(url, params)
    }
    //全てのプロジェクトを取得
    getProjectList(){
        const url = "/project";
        return this.http.get(url);
    }
    // プロジェクト編集
    editProjectList(project_id, params){
        const url = "/project/" + project_id;
        return this.http.put(url, params)
    }
    // 単一のプロジェクトを取得
    getProjectDetail(project_id){
        const url = "/project/" + project_id;
        return this.http.get(url)
    }
    //host追加
    addHost(params){
        const url = "/host";
        return this.http.post(url, params);
    }
    //host削除
    deleteHost(host_id){
        const url = "/host/" + host_id;
        return this.http.delete(url)
    }
    //api追加
    addApi(params){
        const url = "/api";
        return this.http.post(url, params)
    }
    //api削除
    deleteApi(api_id){
        const url = "api/"+api_id;
        return this.http.delete(url)
    }
    //api編集
    editApi(api_id, params){
        const url = "api/"+api_id;
        return this.http.put(url, params)
    }
    //apiの実行
    runApi(api_id){
        const url = "/run/api/" + api_id;
        return this.http.post(url)
    }
    //test caseの新規追加
    addCase(params){
        const url = "/case";
        return this.http.post(url, params);
    }
    //test caseの編集
    editCase(case_id, params){
        const url = "/case/" + case_id;
        return this.http.put(url, params);
    }
    // test caseの実行
    runCase(case_id){
        const url="/run/case/"+case_id;
        return this.http.post(url);
    }
    // 実行記録を取得
    getRunRecords(project_id, type){
        const url = "/records?project="+project_id + "&type=" + type;
        return this.http.get(url)
    }
    // ユーザーデータ変更
    editUser(params) {
        const url = "/auth/user";
        return this.http.put(url, params);
    }
    // ユーザーリストを取得
    getUserList(){
        const url = "/auth/user";
        return this.http.get(url)
    }
}

export default new Http();
