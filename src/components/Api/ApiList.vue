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

        <el-dialog title="実行結果" :visible.sync="dialogVisiable" width="80%">
            <el-table :data="[record]" height="250">
                <el-table-column fixed property="url" label="url" width="150"></el-table-column>
                <el-table-column property="http_method" label="リクエストmethod" width="100"></el-table-column>
                <el-table-column property="headers" label="リクエストヘッド"></el-table-column>
                <el-table-column property="data" label="リクエストボディ"></el-table-column>
                <el-table-column property="return_code" label="ステータスコード" width="80"></el-table-column>
                <el-table-column property="return_content" label="リスポンスボディ"></el-table-column>
                <el-table-column property="run_result" label="テスト結果" width="100">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.run_result===true">成功</el-tag>
                        <el-tag type="danger" v-if="scope.row.run_result===false">失敗</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
    import pageType from "./pageType";
    export default {
        name: "ApiList",
        props: ['project'],
        data(){
            return {
               dialogVisiable: false,
               record: {}
            }
        },
        components:{},
        methods:{
            onGotoAddApi(){
                this.$emit("page-changed", pageType.ADD_API)
            },
            // apiの実行
            onRunApi(api, index){
                this.$loading.show();
                this.$http.runApi(api.id).then(res => {
                    this.$loading.hide();
                    const record = res.data;
                    console.log(record);
                    record.run_result = record.return_code === record.api.expect_code;
                    this.record = record;
                    this.dialogVisiable = true
                })
            },
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
