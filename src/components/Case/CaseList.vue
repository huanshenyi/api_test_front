<template>
    <div class="">
        <div class="top-group">
            <el-button type="primary" icon="el-icon-plus" @click="onAddCase">新規ケース</el-button>
        </div>
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
            }
        }
    }
</script>

<style scoped lang="scss">
.top-group{
    padding: 10px 0;
}
</style>
