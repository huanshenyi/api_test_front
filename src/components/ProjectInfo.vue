<template>
   <div class="">
      <ul class="project-info-group">
         <li>
            <span class="title">名称:</span>
            <span class="detail">{{project.name}}</span>
         </li>
         <li>
            <span class="title">タイプ:</span>
            <span class="detail">{{project.type}}</span>
         </li>
         <li>
            <span class="title">紹介:</span>
            <span class="detail">{{project.description}}</span>
         </li>
         <li>
            <span class="title">追加時間:</span>
            <span class="detail">{{project.create_time|dateFormat}}</span>
         </li>
         <li>
            <span class="title">更新時間:</span>
            <span class="detail">{{project.last_update_time|dateFormat}}</span>
         </li>
         <li>
            <span class="title">auth:</span>
            <span class="detail">{{project.user?project.user.username:""}}</span>
         </li>
      </ul>
   </div>
</template>

<script>
    export default {
        name: "ProjectInfo",
        props: ["project"],
        data() {
            return {}
        }
    }
</script>

<style scoped lang="scss">
.project-info-group{
   li{
      padding: 20px 0;
      border-bottom: 1px solid #ccc;
      .title {
         display: inline-block;
         font-weight: 700;
         width: 100px;
      }
   }
}
</style>
