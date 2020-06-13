<template>
    <div>
      <h1 style="padding: 10px 0">設定</h1>
      <div class="form-group">
        <el-form ref="form" :model="form" label-width="180px" :rules="rules" label-position="left">
          <el-form-item label="ユーザーネーム" prop="username">
            <el-input v-model="form.username" placeholder="ユーザーネームを入力してください！"></el-input>
          </el-form-item>
          <el-form-item label="携帯番号" prop="telephone">
            <el-input v-model="form.telephone" placeholder="携帯番号を入力してください！"></el-input>
          </el-form-item>
          <el-form-item label="アドレス" prop="email">
            <el-input v-model="form.email" placeholder="アドレスを入力してください！"></el-input>
          </el-form-item>
          <el-form-item label="アイコン">
            <el-upload
              class="avatar-upload"
              :action="upload_action"
              :header="headers"
              :show-file-list="false"
              :on-success="onUploadSuccess"
              :before-upload="onBeforeUpload"
            >
              <img v-if="form.avatar" :src="form.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-upload-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">提出</el-button>
            <el-button type="default" @click="onCancel">キャンセル</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default {
        name: "settings",
        data(){
            return {
              form: {
                username: "",
                email: "",
                telephone: "",
                avatar: ""
              },
              headers: {
                'Authorization': "JWT " + this.$auth.token
              },
              upload_action: "http://127.0.0.1:8000/auth/upload",
              rules:{
                username: [{required: true,trigger:"blur",message:"ユーザーネームを入力してください！"}],
                email: [{required: true,trigger:"blur",message:"アドレスを入力してください！"}],
                // telephone: [{required: true,trigger:"blur",message:"携帯番号を入力してください！"}],
              }
            }
        },
        components:{},
        mounted(){
            const user = this.$auth.user;
            let form = {
              username:user.username,
              email:user.email,
              telephone:user.telephone,
              avatar: user.avatar
            };
            this.form = form
        },
      methods: {
        onUploadSuccess(res,file){
          //成功すればアイコン変える
          this.form.avatar = res.picture
        },
        onBeforeUpload(file){
          const isJPG = file.type === 'image/jpeg' || 'image/png';
          console.log(isJPG);
          const isLt2M = file.size / 1024 / 1024 < 2;
          // if (!isJPG) {
          //   alert('上传头像图片只能是 JPG 格式!');
          // }
          if (!isLt2M) {
            alert('画像のサイズは 2MB以内でお願いします!');
          }
          return isJPG && isLt2M;
        },
        onSubmit(){
          this.$refs['form'].validate(valid => {
            if(!valid){
              return
            }
            this.$loading.show();
            this.$http.editUser(this.form).then(res => {
              this.$loading.hide();
              const user = res.data;
              this.$auth.setUser(user);
              this.$message.success()
            })
          })
        },
        onCancel(){}
      }
    }
</script>

<style scoped lang="scss">
.form-group{
  width: 500px;
}

.avatar-upload{
  .avatar {
    width: 133px;
    height: 133px;
    display: block;
  }
  .avatar-upload-icon{
    font-size: 28px;
    color: #8c939d;
    width: 133px;
    height: 133px;
    line-height: 133px;
    text-align: center;
  }
}
</style>
<style scoped>
.avatar-upload >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-upload >>> .el-upload:hover {
  border-color: #409eff;
}
</style>
