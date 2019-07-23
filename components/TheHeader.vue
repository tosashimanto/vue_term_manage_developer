<template>
  <el-menu mode="horizontal" :router="true">
    <el-menu-item index="1" style="pointer-events:none;">
      Nuxt Term Manage App
    </el-menu-item>
    <el-menu-item index="2" :route="{ path: '/posts/' }">
      一覧
    </el-menu-item>

    <el-menu-item
      index="5"
      style="float: right"
      :route="{ path: '/posts/new' }"
    >
      新規
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    // ...mapGetters(['user'])
  }
};
</script>
