<template>
    <div>
     <div class="card-list-group">
        <el-row :gutter="20">
          <el-col :span="4">
            <el-card>
            <div slot="header">プロジェクト数</div>
            <div class="card-body">{{count.project}}</div>
          </el-card>
          </el-col>
          <el-col :span="4">
            <el-card>
              <div slot="header">API数</div>
              <div class="card-body">{{count.api}}</div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card>
              <div slot="header">ケース数</div>
              <div class="card-body">{{count.case}}</div>
            </el-card>
          </el-col>
          <el-col :span="4">
            <el-card>
              <div slot="header">節約した工数</div>
              <div class="card-body">{{count.api_record+count.case_record}}</div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                count: {
                    project: 0,
                    api: 0,
                    case: 0,
                    api_record: 0,
                    case_record: 0
                }
            }
        },
        components: {},
        mounted() {
            this.$http.getIndexData().then(res => {
                const count = res.data.count;
                this.count = count;
                this.count.run = count.api_record+count.case_record;
            })
        }
    }
</script>

<style scoped lang="scss">
.page-title{
    font-size: 20px;
}
.card-list-group{
  padding-top: 20px;
  text-align: center;
    /*font-weight: bold;*/
  .card-body{
    font-weight: 600;
    font-size: 30px;
  }
}
</style>
