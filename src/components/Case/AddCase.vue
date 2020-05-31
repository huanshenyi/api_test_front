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
        props: ["project"],
        data(){
            return {
                form: {
                name: "",
                description: "",
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
        methods: {
            onGotoCaseList(){
               this.$emit("page-changed", pageType.CASE_LIST)
            },
            onSave(){},
            onCancel(){},
            // テストケースパラメータの削除
            onRemoveCaseArgument(argument,index){
              this.form.arguments.splice(index, 1)
            },
            // テストケースパラメータの増加
            onAddCaseArgument(argument,index){
                this.form.arguments.push(argument)
            },
            // apiを削除
            onRemoveApi(case_api,index){
                this.form.api_list.splice(index, 1)
            },
            // api追加
            onAddApi(case_api,index){
                this.form.api_list.push(case_api)
            },
            //
            onRemoveApiArgument(case_api,argument,index){
                case_api.arguments.splice(index, 1)
            },
            //
            onAddApiArgument(case_api){
                case_api.arguments.push(case_api)
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
