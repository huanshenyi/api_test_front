<template>
    <div>
        <div class="top-group">
            <el-link type="default" icon="el-icon-back" :underline="false" @click="onGotoApiList">Apiリスト</el-link>
            <el-button-group>
                <el-button type="primary" @click="onSave">保存</el-button>
                <el-button type="default" @click="onCancel">キャンセル</el-button>
            </el-button-group>
        </div>
    </div>
</template>

<script>
    import pageType from "./pageType";
    export default {
        name: "AddApi",
        methods: {
            onGotoApiList(){
                this.$emit("page-changed", pageType.API_LIST)
            },
            onSave(){},
            onCancel(){}
        }
    }
</script>

<style scoped lang="scss">
.top-group{
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
}
</style>
