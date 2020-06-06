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
    </div>
</template>

<script>
    import pageType from "./pageType";

    export default {
        name: "CaseList",
        props: ["project"],
        data(){
            return {}
        },
        components: {},
        methods: {
            onAddCase(){
                this.$emit("page-changed", pageType.ADD_CASE)
            },
            onRunCase(caseObj, index){

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
