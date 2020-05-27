<template>
    <div>
        <ApiList v-if="page === pageType.API_LIST" :project="project" @page-changed="onPageChanged"></ApiList>
        <AddApi v-if="page === pageType.ADD_API" :project="project" @page-changed="onPageChanged" :api="api"></AddApi>
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
               pageType,
               api: null
            }
        },
        components: {
            AddApi,
            ApiList
        },
        methods: {
            onPageChanged(page, api){
                this.page = page;
                this.api = api;
            }
        }
    }
</script>

<style scoped>

</style>
