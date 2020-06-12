<template>
    <div class="record-table">
        <el-table :data="records" style="width: 100%">
            <el-table-column prop="url" label="url">
            </el-table-column>
            <el-table-column prop="http_method" label="メソッド" width="100">
            </el-table-column>
            <el-table-column prop="data" label="リクエストパラメータ">
            </el-table-column>
            <el-table-column prop="return_code" label="code" width="100">
            </el-table-column>
            <el-table-column prop="return_content" label="リスポンスbody">
            </el-table-column>
            <el-table-column label="ステータス" width="100">
              <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.api.expect_code == scope.row.return_code" effect="dark">Success</el-tag>
                <el-tag type="danger" v-else effect="dark">Failure</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="実行時間" width="200">
              <template slot-scope="scope">
                {{scope.row.create_time|dateFormat}}
              </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  name: "RecordTable",
  props: ['records'],
  data() {
    return {}
  },
  components: {}
}
</script>

<style scoped>

</style>
