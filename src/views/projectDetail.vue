<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="プロダクト紹介" name="1">
               <ProjectInfo :project="project"></ProjectInfo>
            </el-tab-pane>
            <el-tab-pane label="プロダクトHost" name="2">
               プロダクトHost
            </el-tab-pane>
            <el-tab-pane label="API管理" name="3">
               API
            </el-tab-pane>
            <el-tab-pane label="テストケース" name="4">
               テストケース
            </el-tab-pane>
            <el-tab-pane label="実行履歴" name="5">
               実行履歴
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import ProjectInfo from "../components/ProjectInfo";
    export default {
        name: "projectDetail",
        data() {
           return {
               activeName: "1",
               project: {}
           }
        },
        components: {
            ProjectInfo
        },
        mounted() {
            const project_id = this.$route.params.project_id;
            this.$http.getProjectDetail(project_id).then(res=>{
                const project = res.data;
                this.project = project
            })
        }
    }
</script>

<style scoped>

</style>
