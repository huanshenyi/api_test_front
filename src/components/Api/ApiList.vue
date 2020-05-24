<template>
    <div>
        <div class="top-group">
            <el-button type="primary" icon="el-icon-plus" @click="onGotoAddApi">Api追加</el-button>
        </div>
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
            }
        }
    }
</script>

<style scoped lang="scss">
.top-group {
    padding: 10px 0;
}
</style>
