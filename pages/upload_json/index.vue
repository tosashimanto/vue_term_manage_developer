<template>
  <el-container>
    <el-main>
      <el-upload
        class="upload-demo"
        drag
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :file-list="fileList"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          ここにJSONファイルをドラッグするか <em>クリックしてください</em>
        </div>
      </el-upload>
      <el-table
        :data="getPosts"
        :span-method="objectSpanMethod"
        stripe
        style="width: 100%"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="apk" label="APK名" width="320"></el-table-column>
        <el-table-column prop="versionName" label="バージョン名" width="120">
        </el-table-column>
        <el-table-column prop="targetNum" label="会社ID数" width="80">
        </el-table-column>
        <el-table-column prop="companyId" label="会社ID" width="120">
        </el-table-column>
        <el-table-column prop="carIdNum" label="車両ID数" width="80">
        </el-table-column>
        <el-table-column prop="carIds" label="車両ID"> </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import Logo from "~/components/Logo.vue";
import { mapActions, mapGetters } from "vuex";
import lodash from "lodash";
export default {
  data() {
    return {
      fileList: [],
      edit_posts: []
    };
  },
  computed: {
    getPosts() {
      this.edit_posts = lodash.cloneDeep(this.posts);
      return this.edit_posts;
    },
    ...mapGetters("upload_json", ["posts"])
  },
  methods: {
    /**
     * localhostサーバーに JSONファイルをPUT
     */
    async handleAvatarSuccess(res, file) {
      var uploadUrl = "http://localhost:8330/api/upload_check";
      await this.uploadJSON({
        uploadUrl: uploadUrl,
        imageFile: file
      });
    },
    /**
     * ファイルTypeおよびサイズチェック
     */
    beforeAvatarUpload(file) {
      const isJPG = file.type === "application/json";
      const isLt2M = file.size / 1024 / 1024 < 2;
      console.log("upload file size=" + file.size);
      console.log("upload file type=" + file.type);
      if (!isJPG) {
        this.$message.error("JSONファイルではありません!");
      }
      if (!isLt2M) {
        this.$message.error("ファイルサイズが2MByteを超えています!");
      }
      return isJPG && isLt2M;
    },
    /**
     * Table Row制御
     */
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (row.targetNum > 1 && columnIndex > 0 && columnIndex < 4) {
        if (row.index2 === 0) {
          return {
            rowspan: row.targetNum,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    ...mapActions("upload_json", ["uploadJSON"]),
    ...mapGetters("upload_json", ["posts"])
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>