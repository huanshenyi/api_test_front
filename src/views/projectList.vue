<template>
    <div class="">
        <h1 style="font-weight: bold;padding-bottom: 5px">プロジェクトリスト</h1>
        <div class="top-group">
            <el-button type="primary" icon="el-icon-plus" @click="onAddProjectButtonClick">プロダクト追加</el-button>
        </div>
        <el-table :data="projects" style="width: 100%">
            <el-table-column prop="name" label="プロジェクト名" width="180">
              <template slot-scope="scope">
                <router-link :to="'/project/'+scope.row.id">{{scope.row.name}}</router-link>
              </template>
            </el-table-column>
            <el-table-column prop="type" label="タイプ" width="100">
            </el-table-column>
            <el-table-column label="ラスト修正時刻">
                <template slot-scope="scope">
                    {{scope.row.last_update_time | dateFormat}}
                </template>
            </el-table-column>
            <el-table-column prop="description" label="詳細">
            </el-table-column>
            <el-table-column label="ステータス" width="100">
                <template>
                    <el-tag type="success">使用可能</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <el-button @click="onEditProject(scope.row)" size="mini">編集</el-button>
                    <el-button type="danger" size="mini">削除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="新規プロジェクト" :visible.sync="addDialogVisiable">
            <el-form ref="projectForm" :model="projectForm" label-width="80px" :rules="projectRules">
              <el-form-item label="名称" prop="name">
                <el-input v-model="projectForm.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="タイプ" prop="type">
                <el-select v-model="projectForm.type" placeholder="タイプを選んでください">
                  <el-option label="Web" value="web"></el-option>
                  <el-option label="App" value="app"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="詳細" prop="description">
                <el-input type="textarea" v-model="projectForm.description" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addDialogVisiable = false">キャンセル</el-button>
              <el-button type="primary" @click="onSubmitAddProject" :loading="addProjectButtonLoading">追加</el-button>
            </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "ProjectList",
        mounted() {
          this.$http.getProjectList().then(res=>{
              const projects = res.data;
              this.projects = projects
          })
        },
        data(){
            return {
                projects: [],
                addDialogVisiable: false,
                dialogType: "add",
                projectForm: {
                    name: "",// プロダクト名
                    type: '',// app?web
                    description: ""// 詳細
                },
                projectRules: {
                    name: [
                      {required: true,message: "プロジェクト名は空です！",trigger: "blur"}
                    ],
                    type: [
                      {required: true,message: "タイプを選びください！",trigger: "blur"}
                    ]
                  },
                addProjectButtonLoading:false
            }
        },
        methods: {
            // データ提出後のfromデータ削除用
            initProjectForm(){
              this.projectForm = {
                    name: "",
                    type: '',
                    description: ""
              }
            },
            onAddProjectButtonClick(){
                this.dialogType = "add"
            },
            onEditProject(project){
                this.projectForm = {
                    name: project.name,
                    type: project.type,
                    description: project.description,
                    id: project.id
                };
                this.addDialogVisiable = true;
                this.dialogType = "edit"
            },
            onSubmitAddProject(){
                this.addProjectButtonLoading = true;
                this.$refs.projectForm.validate(valid => {
                    if(!valid){
                        return
                    }
                    if(this.dialogType === "add"){
                        this.$http.addProject(this.projectForm).then(res => {
                            this.addProjectButtonLoading = false;
                            if(res && res.status === 201){
                                const project = res.data;
                                this.projects.push(project);
                                this.addDialogVisiable = false;
                                this.initProjectForm();
                                this.$message.success("プロジェクト新規追加しました。")
                            }
                        })
                    }else {
                         this.$http.editProjectList(this.projectForm.id, this.projectForm).then(res =>{
                             this.addProjectButtonLoading = false;
                             if(res){
                               this.addDialogVisiable = false;
                               this.initProjectForm();
                               const project = res.data;
                               let index = 0;
                               for(let loop_project of this.projects){
                                   if(loop_project.id === project.id){
                                       this.$set(this.projects, index, project);
                                       break
                                   }
                                   index++
                               }
                               this.$message.success("内容修正しました。")
                             }
                         })
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
.top-group{
    padding: 10px;
    text-align: right;
}
</style>
