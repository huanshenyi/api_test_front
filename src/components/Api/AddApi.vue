<template>
    <div>
        <div class="top-group">
            <el-link type="default" icon="el-icon-back" :underline="false" @click="onGotoApiList">Apiリスト</el-link>
            <el-button-group>
                <el-button type="primary" @click="onSave">保存</el-button>
                <el-button type="default" @click="onCancel">キャンセル</el-button>
            </el-button-group>
        </div>

        <div class="main-group">
            <el-form ref="form" :model="form" :inline="true" label-width="80px" :rules="rules">
               <el-collapse v-model="activeNames" class="collapse-group">
                   <el-collapse-item title="Api" name="1">
                       <el-form-item label="Api名" prop="name">
                           <el-input v-model="form.name" placeholder="Api名称入力"></el-input>
                       </el-form-item>
                       <el-form-item label="method" prop="http_method">
                           <el-select v-model="form.http_method" placeholder="リクエスト種類選ぼう">
                               <el-option label="GET" value="GET"></el-option>
                               <el-option label="POST" value="POST"></el-option>
                               <el-option label="DELETE" value="DELETE"></el-option>
                               <el-option label="PUT" value="PUT"></el-option>
                           </el-select>
                       </el-form-item>
                       <el-form-item label="host" prop="host_id">
                           <el-select v-model="form.host_id" placeholder="hostをお選びください">
                              <template v-if="project && project.host_list">
                                <el-option v-for="host in project.host_list" :label="host.name" :value="host.id" :key="host.name"></el-option>
                              </template>
                           </el-select>
                       </el-form-item>
                      <el-form-item label="path" prop="path">
                        <el-input v-model="form.path" placeholder="请输入url的path"></el-input>
                      </el-form-item>
                   </el-collapse-item>

                   <el-collapse-item title="リクエストヘッダ" name="2">
                      <el-table
                        :data="form.headers"
                        style="width: 100%">
                        <el-table-column
                          prop="name"
                          label="key"
                          width=200>
                          <template slot-scope="scope">
                            <el-select placeholder="headタイプ" v-model="scope.row.name" :filterable="true">
                                <el-option v-for="item in headers" :key="item" :label="item" :value="item"></el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="value"
                          label="value"
                          width="600">
                          <template slot-scope="scope">
                            <el-input v-model="scope.row.value" :value="scope.row.value" placeholder="内容を入力してください"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="操作"
                          width="200">
                          <template slot-scope="scope">
                            <el-button icon="el-icon-delete" type="danger" size="mini" @click="onDeleteHeader(scope.$index)" v-if="form.headers.length>1"></el-button>
                            <el-button icon="el-icon-plus" type="primary" size="mini" v-if="scope.$index===form.headers.length-1" @click="onAddHeader"></el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-collapse-item>

                   <el-collapse-item title="リクエストパラメータ" name="3">
                      <el-table
                        :data="form.data"
                        style="width: 100%">
                        <el-table-column
                          prop="name"
                          label="パラメータ名"
                          width=200>
                          <template slot-scope="scope">
                            <el-input v-model.trim="scope.row.name" :value="scope.row.name" placeholder="パラメータ名を入力してください"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="value"
                          label="パラメータ値"
                          width="600">
                          <template slot-scope="scope">
                            <el-input v-model.trim="scope.row.value" :value="scope.row.value" placeholder="パラメータの値を入力してください"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="操作"
                          width="200">
                          <template slot-scope="scope">
                            <el-button icon="el-icon-delete" type="danger" size="mini" @click="onDeleteBody(scope.$index)" v-if="form.data.length>1"></el-button>
                            <el-button icon="el-icon-plus" type="primary" size="mini" v-if="scope.$index==form.data.length-1" @click="onAddBody"></el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                   </el-collapse-item>

                   <el-collapse-item title="希望結果" name="4">
                      <el-form-item label="code" prop="expect_code">
                        <el-select v-model="form.expect_code" placeholder="希望コードを選びください">
                          <el-option v-for="status_code in status_codes" :label="status_code" :value="status_code" :key="status_code"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="内容" prop="expect_content">
                        <el-input v-model="form.expect_content" type="textarea" placeholder="希望内容を入力してください" rows="5" cols="40"></el-input>
                      </el-form-item>
                   </el-collapse-item>

                   <el-collapse-item title="詳細" name="5">
                      <el-input class="desc-input" v-model="form.description" type="textarea" placeholder="詳細を入力してください！"></el-input>
                   </el-collapse-item>

               </el-collapse>
            </el-form>
        </div>
    </div>
</template>

<script>
    import pageType from "./pageType";
    export default {
        name: "AddApi",
        props: ['project','api'],
        mounted() {
            if(this.api){
                const headers = JSON.parse(this.api.headers);
                const formdata = JSON.parse(this.api.data);
                const form = {
                  id: this.api.id,
                  name: this.api.name,
                  host_id: this.api.host.id,//backedではserializersのhost_idである
                  http_method: this.api.http_method,
                  path: this.api.path,
                  headers: headers.length > 0 ? headers: [{name:"", value:""}],
                  data: formdata.length > 0 ? formdata: [{name:"", value:""}],
                  description: this.api.description,
                  expect_code: this.api.expect_code,
                  expect_content: this.api.expect_content
                };
                this.form = form
            }
        },
        data(){
          return {
              form:{
                  name: "",
                  host_id: "",//backedではserializersのhost_idである
                  http_method: "",
                  path: "",
                  headers: [{name:"", value:""}],
                  data: [{name:"", value:""}],
                  description: "",
                  expect_code: "",
                  expect_content: ""
              },
              rules: {
                name: [{required: true,trigger:"blur",message: "API名称を入れてください！"}],
                host_id: [{required: true,trigger:"change",message: "hostを選びください！"}],
                http_method: [{required: true,trigger:"change",message: "http methodを選択してください！"}],
                path: [{required: true,trigger:"blur",message: "PATHを入力してください！"}],
                expect_code: [{required: true,trigger:"change",message: "ステータスコード選びください！"}]
              },
              activeNames: ['1', '2', '3', '4', '5'],
              headers: ['Accept',
                     'Accept-Charset',
                     'Accept-Encoding',
                     'Accept-Language',
                     'Accept-Ranges',
                     'Authorization',
                     'Cache-Control',
                     'Connection',
                     'Cookie',
                     'Content-Length',
                     'Content-Type',
                     'Content-MD5',
                     'Date',
                     'Expect',
                     'From',
                     'Host',
                     'If-Match',
                     'If-Modified-Since',
                     'If-None-Match',
                     'If-Range',
                     'If-Unmodified-Since',
                     'Max-Forwards',
                     'Origin',
                     'Pragma',
                     'Proxy-Authorization',
                     'Range',
                     'Referer',
                     'TE',
                     'Upgrade',
                     'User-Agent',
                     'Via'
           ],
              status_codes: ['200','201','202','203','204','301','302','400','401','403','404','405','406','407','408','500','502']
          }
        },
        methods: {
            onGotoApiList(){
                this.$emit("page-changed", pageType.API_LIST)
            },
            onSave(){
                this.$refs.form.validate(valid => {
                    if(!valid){
                        return
                    }
                    const params = JSON.parse(JSON.stringify(this.form));
                    const headers = [];
                    const formdata = [];
                    for(let header of params.headers){
                        if(header.name && header.value){
                            headers.push(header)
                        }
                    }
                    for(let data of params.data) {
                        if(data.name && data.value){
                            formdata.push(data)
                        }
                    }
                    params.headers = JSON.stringify(headers);
                    params.data = JSON.stringify(formdata);
                    params.project_id = this.project.id;
                    this.$loading.show();
                    if(this.form.id){
                        //編集
                        this.$http.editApi(this.api.id, params).then(res => {
                            this.$loading.hide();
                            this.$message.success();
                            const api = res.data;
                            let index = 0;
                            //変更後のapiで元のapi_listのitemと入れ替え
                            for(let temp_api of this.project.api_list){
                                if(temp_api.id === api.id){
                                    this.project.api_list[index] = api;
                                    break
                                }
                                index++
                            }
                            this.$emit("page-changed", pageType.API_LIST)
                        })
                    }else {
                        //新規追加
                        this.$http.addApi(params).then(res => {
                            this.$loading.hide();
                            this.$message.success();
                            const api = res.data;
                            this.project.api_list.push(api);
                            this.$emit("page-changed", pageType.API_LIST)
                        })
                    }
                })
            },
            onCancel(){},
            onDeleteHeader(index){
                this.form.headers.splice(index, 1)
            },
            onAddHeader(){
                this.form.headers.push({name:"", value:""})
            },
            onDeleteBody(index){
                this.form.data.splice(index, 1)
            },
            onAddBody(){
                this.form.data.push({name:"", value:""})
            }
        }
    }
</script>

<style scoped lang="scss">
.top-group{
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
}
</style>

<style scoped>
    .collapse-group >>> .el-collapse-item{
        padding: 0 20px;
        background: #ffffff;
    }
</style>
