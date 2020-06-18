<template>
    <div class="">
        <el-table :data="user_list" style="width: 100%">
            <el-table-column prop="username" label="ユーザーネーム"></el-table-column>
            <el-table-column prop="telephone" label="携帯番号"></el-table-column>
            <el-table-column prop="email" label="アドレス"></el-table-column>
            <el-table-column label="追加時間">
                <template slot-scope="scope">
                    {{scope.row.data_joined | dateFormat}}
                </template>
            </el-table-column>
            <el-table-column prop="is_active" label="ステータス">
              <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.is_active==true">Success</el-tag>
                <el-tag type="danger" v-if="scope.row.is_active==false">Block</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <el-button type="danger" size="mini">使用停止</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "memberList",
        data(){
            return {
                user_list: []
            }
        },
        components: {},
        mounted() {
           this.$http.getUserList().then(res => {
               this.user_list = res.data;
           })
        }
    }
</script>

<style scoped>

</style>
