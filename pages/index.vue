<template>
  <section class="container posts-page">
    <el-container>
      <div>
        <ul>
          <li>
            <nuxt-link to="/term_manager">端末管理</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/vehicle-log">動態ログ</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/meter_cloud">メータークラウド</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/upload_json">JSONファイルチェック</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/upload_image">Imageファイル Uplaod</nuxt-link>
          </li>
        </ul>
      </div>
    </el-container>
  </section>
</template>

<script>
import Logo from "~/components/Logo.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  async asyncData({ store, route }) {
    // await store.dispatch('images/getImageList')
  },
  components: {
    Logo
  },
  methods: {}
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
