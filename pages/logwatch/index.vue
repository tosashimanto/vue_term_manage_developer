<template>
  <el-container>
    <el-main>
      <el-form ref="form" :model="form" label-width="10px">
        <el-form-item>
          <el-input
            type="textarea"
            v-model="form.log"
            placeholder="JSONデータをペーストしてください"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit"
            >ペーストデータ解析</el-button
          >
        </el-form-item>
      </el-form>
      <el-table
        :data="getMessages"
        :default-sort="{ prop: 'timestamp', order: 'descending' }"
        stripe
        style="width: 100%"
      >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column
          prop="timestamp"
          label="Timestamp"
          sortable
          width="200"
        >
        </el-table-column>

        <el-table-column prop="message" label="メッセージ" sortable>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
const moment = require("moment-timezone");

export default {
  data() {
    return {
      form: {
        log: ""
      },
      messages: []
    };
  },
  computed: {
    getMessages() {
      return this.messages;
    }
  },
  methods: {
    onSubmit() {
      console.log("add message");
      if (this.form.log && this.form.log != "") {
        try {
          const log_data = JSON.parse(this.form.log);
          const message0 = JSON.parse(log_data._source.message);
          const timestamp = log_data.fields.timestamp;
          console.log("timestamp=" + timestamp);
          var detail_message = "";
          const message1 = message0.message;
          if (message1) {
            console.log("message1=" + JSON.stringify(message1, undefined, 4));
            try {
              const message2 = JSON.parse(message1);
              console.log("message2=" + message2);
              const message3 = JSON.stringify(message2, undefined, 4);
              console.log("message3=" + message3);
              const target_message = JSON.parse(message3);
              if (target_message.message) {
                detail_message = target_message.message;
              } else {
                detail_message = JSON.stringify(target_message, undefined, 4);
              }
            } catch (e) {
              detail_message = JSON.stringify(message1, undefined, 4);
            }
          } else {
            detail_message = JSON.stringify(message0, undefined, 4);
          }
          console.log("message detail=" + detail_message);

          // JST変換
          moment.tz.setDefault("Asia/Tokyo");
          const t = moment(new Date(timestamp)).format("YYYY-MM-DD HH:mm:ss");
          // messages配列に追加
          this.messages.push({ timestamp: t, message: detail_message });
          this.form.log = "";
        } catch (e) {
          this.form.log = "";
          this.$message({
            showClose: true,
            message: "JSONデータの解析に失敗しました",
            type: "error"
          });
        }
      }
    }
  }
};
</script>