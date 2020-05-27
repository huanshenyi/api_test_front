<template>
    <div>
        <div class="top-group">
            <el-button type="primary" icon="el-icon-plus" @click="onGotoAddApi">Api追加</el-button>
        </div>
        <el-table
            :data="project.api_list"
            style="width: 100%">
            <el-table-column
              prop="name"
              label="名称">
            </el-table-column>
            <el-table-column
              label="Host">
              <template slot-scope="scope">
                {{scope.row.host.host}}
              </template>
            </el-table-column>
            <el-table-column
              prop="description"
              label="詳細">
            </el-table-column>
            <el-table-column
              label="操作"
              width=300>
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="onRunApi(scope.row,scope.$index)">実行</el-button>
                <el-button size="mini" @click="onEditApi(scope.row,scope.$index)">編集</el-button>
                <el-button type="danger" size="mini" @click="onDeleteApi(scope.row,scope.$index)">削除</el-button>
              </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import pageType from "./pageType";
    export default {
        name: "ApiList",
        props: ['project'],
        data(){
            return {

            }
        },
        components:{},
        methods:{
            onGotoAddApi(){
                this.$emit("page-changed", pageType.ADD_API)
            },
            onRunApi(api, index){},
            // apiの編集
            onEditApi(api, index){
               //
                this.$emit("page-changed", pageType.ADD_API, api)
            },
            onDeleteApi(api, index){
                this.$messagebox.confirm({
                    confirmCallback: () => {
                        this.$loading.show();
                        this.$http.deleteApi(api.id).then(res => {
                            this.$loading.hide();
                            this.$message.success();
                            this.project.api_list.splice(index, 1);
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped lang="scss">
.top-group {
    padding: 10px 0;
}
</style>
