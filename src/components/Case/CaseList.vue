<template>
    <div class="">
        <div class="top-group">
            <el-button type="primary" icon="el-icon-plus" @click="onAddCase">新規ケース</el-button>
        </div>

        <el-table :data="project.case_list" style="width: 100%">
            <el-table-column prop="name" label="名称">
            </el-table-column>
            <el-table-column prop="description" label="詳細">
            </el-table-column>
            <el-table-column label="追加時間">
                <template slot-scope="scope">
                    {{scope.row.create_time|dateFormat}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="onRunCase(scope.row, scope.$index)">実行</el-button>
                    <el-button size="mini" @click="onEditCase(scope.row, scope.$index)">編集</el-button>
                    <el-button type="danger" size="mini" @click="onDeleteCase(scope.row, scope.$index)">削除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="実行結果" :visible.sync="dialogVisible" width="80%">
              <el-table :data="records" height="500">
                  <el-table-column fixed property="url" label="url" width="150"></el-table-column>
                  <el-table-column property="http_method" label="リクエストメソッド" width="100"></el-table-column>
                  <el-table-column property="headers" label="リクエストヘッド"></el-table-column>
                  <el-table-column property="data" label="リクエストボディ"></el-table-column>
                  <el-table-column property="return_code" label="ステータスコード" width="80"></el-table-column>
                  <el-table-column property="return_content" label="リスポンスボディ"></el-table-column>
                  <el-table-column property="run_result" label="テスト結果" width="100">
                    <template slot-scope="scope">
                      <el-tag type="success" v-if="scope.row.run_result==true">Success</el-tag>
                      <el-tag type="danger" v-if="scope.row.run_result==false">Failure</el-tag>
                    </template>
                  </el-table-column>
              </el-table>
        </el-dialog>

    </div>
</template>

<script>
    import pageType from "./pageType";

    export default {
        name: "CaseList",
        props: ["project"],
        data(){
            return {
                dialogVisible:false,
                records: []
            }
        },
        components: {},
        methods: {
            onAddCase(){
                this.$emit("page-changed", pageType.ADD_CASE)
            },
            // テストケースの実行
            onRunCase(caseObj, index){
                this.$loading.show();
                this.$http.runCase(caseObj.id).then(res => {
                    this.$loading.hide();
                    const case_record = res.data;
                    const records = case_record.api_records;
                    for(let record of records){
                       if(record.return_code === record.api.expect_code){
                           record.run_result = true
                       }else {
                           record.run_result = false
                       }
                    }
                    this.records = records;
                    this.dialogVisible = true;
                })
            },
            onEditCase(caseObj, index){
                this.$emit("page-changed", pageType.ADD_CASE, caseObj)
            },
            onDeleteCase(caseObj, index){}
        }
    }
</script>

<style scoped lang="scss">
.top-group{
    padding: 10px 0;
}
</style>
