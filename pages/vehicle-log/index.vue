<template>
  <el-container>
    <el-main>
      <el-table
        :data="post"
        :default-sort="{ prop: 'receive_date', order: 'descending' }"
        stripe
        style="width: 100%"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column
          prop="receive_date"
          label="受信日時"
          sortable
          width="190"
        ></el-table-column>

        <el-table-column prop="level" label="レベル" sortable width="100">
        </el-table-column>
        <el-table-column prop="tag" label="Tag" sortable width="120">
        </el-table-column>
        <el-table-column prop="message" label="メッセージ" sortable width="300">
        </el-table-column>
        <el-table-column
          prop="meter_state"
          label="メーター"
          sortable
          width="100"
        >
        </el-table-column>
        <el-table-column prop="send_time" label="送信時間" sortable width="200">
        </el-table-column>
        <el-table-column
          prop="timestamp"
          label="Timestamp"
          sortable
          width="200"
        >
        </el-table-column>
        <el-table-column prop="lat" label="緯度" width="80"> </el-table-column>
        <el-table-column prop="lon" label="経度" width="100"> </el-table-column>
        <el-table-column
          prop="product"
          label="プロダクト"
          sortable
          width="120"
        ></el-table-column>
        <el-table-column
          prop="data_category"
          label="カテゴリー"
          sortable
          width="120"
        >
        </el-table-column>
        <el-table-column prop="company_id" label="会社ID" width="80">
        </el-table-column>
        <el-table-column prop="car_id" label="車両ID" width="80">
        </el-table-column>
        <el-table-column prop="term_id" label="端末ID" width="150">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import Logo from "~/components/Logo.vue";
import { mapActions, mapGetters } from "vuex";
import io from "socket.io-client";
export default {
  data() {
    return {
      messages: [],
      socket: io("localhost:8330")
    };
  },
  computed: {
    post() {
      return this.messages;
    }
    // ...mapGetters("meter_cloud", ["posts"])
  },
  methods: {},
  mounted() {
    // 投稿されたデータの取得
    this.socket.on("receive_vehicle_log_page_MESSAGE", data => {
      console.log("receive_meter_cloud_pag socket.on");
      this.messages = [...this.messages, data];
      console.log("messages.length=" + this.messages.length);
      this.messages.forEach(function(msg, index) {
        msg.message = JSON.parse(JSON.stringify(msg.message, undefined, 10));
        console.log(JSON.stringify(msg.message, undefined, 10));
        console.log("message" + index + "=" + msg.message);
      });

      if (this.messages.length > 0) {
        const jsonString = JSON.stringify(this.messages);
        console.log("receive_vehicle_log_page_MESSAGE JSON=" + jsonString);
      }
    });
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