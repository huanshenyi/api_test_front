<template>
    <div class="">
        <div class="top-group">
            <el-link type="default" icon="el-icon-back" :underline="false" @click="onGotoCaseList">ケースリスト</el-link>
            <el-button-group>
                <el-button type="primary" @click="onSave">保存</el-button>
                <el-button type="default" @click="onCancel">キャンセル</el-button>
            </el-button-group>
        </div>
        <el-form ref="form" :model="form" label-width="90px" :rules="rules" :inline="true">
        <div class="case-name-group" style="width: 500px;">
          <el-form-item label="ケース名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </div>
        <!-- ケースパラメータ -->
        <div class="case-argument-group">
          <el-form-item label="ケースパラメータ" label-width="130px">
            <div v-for="(argument,index) in form.arguments" :key="index" class="case-argument-input-group">
              <el-input v-model="argument.name" placeholder="パラメータ名を入力してください"></el-input>
              <el-input v-model="argument.value" placeholder="パラメータの値を入力してください"></el-input>
              <span class="button-group">
                <el-button v-if="form.arguments.length>1" type="info" icon="el-icon-delete" size="mini" @click="onRemoveCaseArgument(argument,index)"></el-button>
                <el-button type="default" icon="el-icon-plus" size="mini" @click="onAddCaseArgument(argument,index)"></el-button>
              </span>
            </div>
          </el-form-item>
        </div>

        <!-- API list -->
        <el-timeline>
          <el-timeline-item
            v-for="(case_api, index) in form.api_list"
            :key="index"
            color='#0bbd87'>
            <el-form-item :label="'第'+(index+1)+'ステップ'" label-width="100px">
              <el-select v-model="case_api.id" placeholder="実行するAPIを選びください">
                <el-option
                  v-for="api in project.api_list"
                  :key="api.name+index"
                  :label="api.name+'('+api.path+')'"
                  :value="api.id">
                </el-option>
              </el-select>
              <span class="button-group">
                <el-button v-if="form.api_list.length>1" type="danger" icon="el-icon-delete" size="mini" @click="onRemoveApi(case_api,index)"></el-button>
                <el-button type="primary" icon="el-icon-plus" size="mini" @click="onAddApi(case_api,index)"></el-button>
              </span>
            </el-form-item>
            <el-form-item label="パラメータ取得" label-width="120px">
              <div v-for="(argument,index) in case_api.arguments" :key="index" class="argument-group">
                <el-input v-model="argument.name" placeholder="パラメータ名を入力してください" class="argument-input"></el-input>

                <el-select v-model="argument.origin" placeholder="パラメータ取得先選択" class="argument-input">
                  <el-option
                    label="リスポンスボディ"
                    value="BODY">
                  </el-option>
                  <el-option
                    label="リスポンスヘッド"
                    value="HEADER">
                  </el-option>
                  <el-option
                    label="リスポンスCookie"
                    value="COOKIE">
                  </el-option>
                </el-select>

                <el-input v-model="argument.format" placeholder="パラメータ取得形式入力してください" class="argument-input"></el-input>

                <span class="button-group">
                  <el-button v-if="case_api.arguments.length>1" type="info" icon="el-icon-delete" size="mini" @click="onRemoveApiArgument(case_api,argument,index)"></el-button>
                  <el-button type="default" icon="el-icon-plus" size="mini" @click="onAddApiArgument(case_api)"></el-button>
                </span>
              </div>
            </el-form-item>
          </el-timeline-item>
        </el-timeline>

        <el-form-item label="ケース詳細">
          <el-input v-model="form.description" type="textarea" :rows="4" :cols="40" placeholder="詳細を入力してください"></el-input>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    import pageType from "./pageType";
    export default {
        name: "AddCase",
        props: ["project", "caseObj"],
        data(){
            return {
                form: {
                name: "",
                description: "", //詳細
                arguments: [{name:"",value:""}],
                api_list: [
                  {
                    id:"",
                    index:0,
                    arguments: [{name:"",origin:"",format:""}]
                  }
                ]
              },
              rules: {
                name: [
                  {required: true,trigger: "blur",message: "ケース名を入力してください！"}
                ]
              }
            }
        },
        components: {},
        mounted() {
            //caseが編集状態であるかどうかの判断
            if(this.caseObj){
                this.form.id = this.caseObj.id;
                this.form.name = this.caseObj.name;
                this.form.description = this.caseObj.description;
                this.form.arguments = JSON.parse(JSON.stringify(this.caseObj.arguments));
                if(!this.form.arguments || this.form.arguments.length===0){
                  this.form.arguments = [{name:"",value:""}]
                }
                this.form.api_list = JSON.parse(JSON.stringify(this.caseObj.api_list));
                for(let api of this.form.api_list){
                    if(!api.arguments || api.arguments.length === 0){
                      api.arguments = [{name:"",origin:"",format:""}]
                    }
                }
            }
        },
        methods: {
            onGotoCaseList(){
               this.$emit("page-changed", pageType.CASE_LIST)
            },
            // テストケースの保存
            onSave(){
                this.$refs.form.validate(valid => {
                    if(!valid){
                        return
                    }
                    const params = JSON.parse(JSON.stringify(this.form));
                    let args = [];
                    for(let argument of params.arguments){
                        if(argument.name && argument.value){
                            args.push(argument)
                        }
                    }
                    params.arguments = args;

                    // APIとパラメータの処理
                    const api_list = [];
                    let index = 0;
                    for(let api of params.api_list){
                        // idあれば保留
                        if(api.id){
                            let args = [];
                            for(let argument of api.arguments){
                                if(argument.name && argument.origin && argument.format){
                                    args.push(argument)
                                }
                            }
                            api.arguments = args;
                            api.index = index;
                            api_list.push(api);
                            index ++
                        }
                    }
                    params.api_list = api_list;
                    // それ以外のパラメータを処理
                    params.project_id = this.project.id;

                    this.$loading.show();
                    if(this.form.id){
                      this.$http.editCase(this.form.id,params).then(res => {
                        this.$loading.hide();
                        this.$message.success();
                        const caseobj = res.data;
                        for(let index=0;index<this.project.case_list.length;index++){
                          const temp_case = this.project.case_list[index];
                          if(temp_case.id === caseobj.id){
                            this.project.case_list[index] = caseobj;
                            break
                          }
                        }
                        this.$emit('page-changed',pageType.CASE_LIST)
                      })
                    }else{
                      this.$http.addCase(params).then(res => {
                        const caseobj = res.data;
                        this.project.case_list.push(caseobj);
                        this.$loading.hide();
                        this.$message.success();
                        this.$emit('page-changed',pageType.CASE_LIST)
                      })
                    }
                })
            },
            onCancel(){},
            // テストケースパラメータの削除
            onRemoveCaseArgument(argument,index){
              this.form.arguments.splice(index, 1)
            },
            // テストケースパラメータの増加
            onAddCaseArgument(argument,index){
                this.form.arguments.push({name:"",value:""})
            },
            // apiを削除
            onRemoveApi(case_api,index){
                this.form.api_list.splice(index, 1)
            },
            // api追加
            onAddApi(case_api,index){
                this.form.api_list.push({
                    id: "",
                    index: 0,
                    arguments: [{name:"", origin:"", format:""}]
                })
            },
            //
            onRemoveApiArgument(case_api,argument,index){
                case_api.arguments.splice(index, 1)
            },
            //
            onAddApiArgument(case_api){
                case_api.arguments.push({name:"", origin:"", format:""})
            }
        }
    }
</script>

<style scoped lang="scss">
.add-case{
  padding: 0 20px;
  background: #fff;
}
.top-group{
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
}
.button-group{
  margin-left: 10px;
}
.case-argument-group{
  .case-argument-input-group{
    width: 500px;
    display: flex;
    justify-content: space-around;
    div{
      width: 160px;
    }
  }
}
.argument-group{
  display: flex;
  width: 600px;
  justify-content: space-around;
  .argument-input{
    width: 160px;
  }
}
</style>
