<template>
  <el-container>
    <el-main>
      <el-table
        :data="post"
        :span-method="objectSpanMethod"
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
        <el-table-column
          prop="companyCode"
          label="会社コード"
          width="100"
        ></el-table-column>
        <el-table-column prop="fmNo" label="車両ID" width="100">
        </el-table-column>
        <el-table-column prop="startTime" label="営業開始日時" width="120">
        </el-table-column>
        <el-table-column prop="getonTime" label="乗車日時" width="120">
        </el-table-column>
        <el-table-column prop="getoffTime" label="降車日時" width="120">
        </el-table-column>
        <el-table-column prop="paymentAmount" label="決済金額" width="120">
        </el-table-column>
        <el-table-column prop="paymentType" label="決済種別"> </el-table-column>
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
  methods: {
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

    ...mapActions("meter_cloud", ["uploadImage"]),
    ...mapGetters("meter_cloud", ["posts"])
  },
  mounted() {
    // 投稿されたデータの取得
    this.socket.on("receive_meter_cloud_page_MESSAGE", data => {
      console.log("receive_meter_cloud_pag socket.on");
      this.messages = [...this.messages, data];
      console.log("messages.length=" + this.messages.length);
      this.messages.forEach(function(msg, index) {
        console.log("msg" + index + "=" + msg.companyCode);
      });

      if (this.messages.length > 0) {
        const jsonString = JSON.stringify(this.messages);
        console.log("receive_meter_cloud_page_MESSAGE JSON=" + jsonString);
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