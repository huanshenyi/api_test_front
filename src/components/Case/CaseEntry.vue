<template>
   <div>
       <CaseList v-if="page===pageType.CASE_LIST" :project="project" @page-changed="onPageChanged"></CaseList>
       <AddCase v-if="page===pageType.ADD_CASE"
                :project="project" @page-changed="onPageChanged" :caseObj="caseObj"></AddCase>
   </div>
</template>

<script>
    import AddCase from "./AddCase";
    import CaseList from "./CaseList";
    import pageType from "./pageType";
    export default {
        name: "CaseEntry",
        props: ["project"],
        data() {
            return {
                page: pageType.CASE_LIST,
                pageType,
                caseObj: null,
            }
        },
        components: {
            AddCase,
            CaseList
        },
        methods: {
            // 表示内容の切り替え用
            onPageChanged(page, caseObj){
                this.page = page;
                this.caseObj = caseObj;
            }
        }
    }
</script>

<style scoped>

</style>
