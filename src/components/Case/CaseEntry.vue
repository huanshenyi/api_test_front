<template>
   <div>
       <CaseList v-if="page===pageType.CASE_LIST" :project="project" @page-changed="onPageChanged"></CaseList>
       <AddCase v-if="page===pageType.ADD_CASE" :project="project" @page-changed="onPageChanged"></AddCase>
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
                pageType
            }
        },
        components: {
            AddCase,
            CaseList
        },
        methods: {
            onPageChanged(page){
                this.page = page;
            }
        }
    }
</script>

<style scoped>

</style>
