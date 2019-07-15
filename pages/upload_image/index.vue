<template>
  <section class="container posts-page">
    <el-card style="flex: 1">
      <el-container>
        <el-container>
          <el-container>
            <el-main>
              <el-upload
                action="up_action"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :auto-upload="false"
              >
                <i class="el-icon-plus"></i>
                <div slot="tip" class="el-upload__tip">
                  jpg/png files with a size less than 500kb
                </div>
              </el-upload>

              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="" />
              </el-dialog>
            </el-main>
          </el-container>
        </el-container>
      </el-container>
    </el-card>
  </section>
</template>

<script>
import Logo from "~/components/Logo.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      },
      dialogImageUrl: "",
      dialogVisible: false,
      fileList: []
    };
  },
  async asyncData({ store, route }) {
    // await store.dispatch('images/getImageList')
  },
  components: {
    Logo
  },
  methods: {
    // 画像List
    async handleClickSubmit() {
      this.$router.push("/images/");
    },
    handleNodeClick(data) {
      console.log("handleNodeClick " + data);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    up_action() {
      console.log("test");
    },

    // リストのバッテンを押下した時
    handleRemove: function(file, fileList) {
      this.fileList = fileList;
    },
    // ファイルを追加した時
    handleAdd: function(file, fileList) {
      this.fileList = fileList;
    }
  }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 90vh;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
body > .el-container {
  margin-bottom: 40px;
}
</style>
