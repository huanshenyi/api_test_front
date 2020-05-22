<template>
    <div class="">
       <div class="top-group">
           <el-button type="primary" icon="el-icon-plus" @click="hostDialogVisible=true">Host追加</el-button>
       </div>

        <el-table :data="project.host_list" style="width: 100%">
            <el-table-column prop="name" label="名称">
            </el-table-column>
            <el-table-column prop="host" label="Host">
            </el-table-column>
            <el-table-column prop="description" label="詳細">
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <el-button size="mini">編集</el-button>
                    <el-button type="danger" size="mini" @click="onDeleteHost(scope.row, scope.$index)">削除</el-button>
                </template>
            </el-table-column>
        </el-table>

       <el-dialog title="Host追加" :visible.sync="hostDialogVisible">
            <el-form ref="hostForm" :model="hostForm" label-width="80px" :rules="hostRules">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="hostForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="host" prop="host">
                    <el-input v-model="hostForm.host" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="詳細" prop="description">
                    <el-input type="textarea" v-model="hostForm.description" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
           <div slot="footer" class="dialog-footer">
               <el-button @click="hostDialogVisible=false">キャンセル</el-button>
               <el-button type="primary" @click="onSubmitAddHost">提 出</el-button>
           </div>
       </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "HostList",
        props: ["project"],
        data(){
            return {
                hostDialogVisible:false,
                hostForm: {
                    name: "",
                    host: "",
                    description: ""
                },
                hostRules: {
                    name: [{required: true, trigger: 'blur', message:"host名空です"}],
                    host: [{required: true, trigger: 'blur', message:"host空です"}],
                },
            }
        },
        methods: {
            onSubmitAddHost(){
              this.$refs.hostForm.validate(valid => {
                  if(!valid){
                      return
                  }
                  const params = JSON.parse(JSON.stringify(this.hostForm));
                  params.project_id = this.project.id;
                  this.$http.addHost(params).then(res => {
                      const host = res.data;
                      this.hostDialogVisible = false;
                      //提出後、フォームをリセット
                      this.hostForm = {
                            name: "",
                            host: "",
                            description: ""
                      };
                      this.project.host_list.push(host);
                  })
              })
            },
            onDeleteHost(host, index){
             //index=>該当hostのlistにおいてのindex
             this.$messagebox.confirm({
                 message: "Hostを削除しますか?",
                 confirmCallback: ()=>{
                     this.$loading.show();
                     // host削除
                     this.$http.deleteHost(host.id).then(res => {
                         this.project.host_list.splice(index, 1);
                         this.$loading.hide();
                         this.$message.success();
                     })
                 }
             })
            }
        }
    }
</script>

<style scoped lang="scss">
.top-group{
    padding: 10px 0;
}
</style>
