<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="プロダクト紹介" name="1">
               <ProjectInfo :project="project"></ProjectInfo>
            </el-tab-pane>
            <el-tab-pane label="プロダクトHost" name="2">
               <HostList :project="project"></HostList>
            </el-tab-pane>
            <el-tab-pane label="API管理" name="3">
               <ApiEntry :project="project"></ApiEntry>
            </el-tab-pane>
            <el-tab-pane label="テストケース" name="4">
               <CaseEntry :project="project"></CaseEntry>
            </el-tab-pane>
            <el-tab-pane label="実行履歴" name="5">
               実行履歴
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import ProjectInfo from "../components/ProjectInfo";
import HostList from "../components/HostList";
import ApiEntry from "../components/Api/ApiEntry";
import CaseEntry from "../components/Case/CaseEntry";
    export default {
        name: "projectDetail",
        data() {
           return {
               activeName: "1",
               project: {}
           }
        },
        components: {
            HostList,
            ProjectInfo,
            ApiEntry,
            CaseEntry
        },
        mounted() {
            const project_id = this.$route.params.project_id;
            this.$http.getProjectDetail(project_id).then(res=>{
                const project = res.data;
                this.project = project;
                console.log(this.project);
            })
        }
    }
</script>

<style scoped>

</style>
