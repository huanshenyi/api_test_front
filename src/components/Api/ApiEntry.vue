<template>
    <div>
        <ApiList v-if="page === pageType.API_LIST" :project="project" @page-changed="onPageChanged"></ApiList>
        <AddApi v-if="page === pageType.ADD_API" :project="project" @page-changed="onPageChanged"></AddApi>
    </div>
</template>

<script>
    import AddApi from "./AddApi";
    import ApiList from "./ApiList";
    import pageType from "./pageType";
    export default {
        name: "ApiEntry",
        props:["project"],
        data(){
            return {
               page: pageType.API_LIST,
               pageType
            }
        },
        components: {
            AddApi,
            ApiList
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
