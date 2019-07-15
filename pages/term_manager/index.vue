<template>
  <section class="container posts-page">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="乗務員端末管理（基本）" name="first">
        <el-card style="flex: 1">
          <div class="clearfix">
            <div>
              <span class="task-input-label">会社ID</span
              ><el-input
                class="task-input"
                placeholder="会社IDを入力"
                v-model="get_model.company_id"
              />
              <span class="task-input-label">会社名</span
              ><el-input
                class="task-input"
                placeholder="会社名を入力"
                v-model="get_model.company_name"
              />
            </div>
            <div>
              <span class="task-input-label">車両ID</span
              ><el-input
                class="task-input"
                placeholder="会社名を入力"
                v-model="get_model.car_id"
              />
            </div>
            <div>
              <span class="task-input-label">パスワード</span
              ><el-input
                class="task-input"
                placeholder="パスワードを入力"
                v-model="get_model.setting_password"
              />
            </div>
            <div>
              <span class="task-input-label">interval_distance</span
              ><el-input
                class="task-input"
                placeholder="interval_distance"
                v-model="get_model.interval_distance"
              />
              <span class="task-input-label">interval_time</span
              ><el-input
                class="task-input"
                placeholder="interval_time"
                v-model="get_model.interval_time"
              />
            </div>
            <div>
              <span class="task-input-label">jtx_link_enabled</span
              ><el-input
                class="task-input"
                placeholder="jtx_link_enabled"
                v-model="get_model.jtx_link_enabled"
              />
            </div>
            <div>
              <span class="task-input-label">ipdispatch_mode</span
              ><el-input
                class="task-input"
                placeholder="ipdispatch_mode"
                v-model="get_model.ipdispatch_mode"
              />
            </div>
          </div>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="単体化" name="second">
        <el-card style="flex: 1">
          <div class="clearfix">
            <div>
              <div>
                <span class="task-input-label2">DRIVER'S単体化有効フラグ</span
                ><el-input
                  class="task-input"
                  placeholder="DRIVER'S単体化有効フラグを入力"
                  v-model="get_model.drivers_singulation_enabled"
                />
              </div>
              <div>
                <span class="task-input-label2">ネット決済加盟店ID</span
                ><el-input
                  class="task-input"
                  placeholder="ネット決済加盟店IDを入力"
                  v-model="get_model.netpay_api_store_id"
                />
              </div>
              <div>
                <span class="task-input-label2">ネット決済アカウント</span
                ><el-input
                  class="task-input"
                  placeholder="ネット決済アカウントを入力"
                  v-model="get_model.netpay_api_account"
                />
                <span class="task-input-label2">ネット決済パスワード</span
                ><el-input
                  class="task-input"
                  placeholder="ネット決済パスワードを入力"
                  v-model="get_model.netpay_api_password"
                />
              </div>
              <div>
                <span class="task-input-label2">メーター種別</span>
                <el-select
                  class="task-input"
                  v-model="get_model.meter_type"
                  placeholder="メーター種別"
                >
                  <el-option
                    v-for="item in meter_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>
          </div>
        </el-card>
      </el-tab-pane>
    </el-tabs>
    <div class="text-right" style="margin-top: 16px;">
      <el-button type="primary" @click="publish" round>
        <span class="el-icon-upload2" />
        <span>登録</span>
      </el-button>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import io from "socket.io-client";
import lodash from "lodash";

export default {
  data() {
    return {
      activeName: "first",
      name: "",
      message: "",
      messages: [],
      socket: io("localhost:8330"),
      edit_model: {},
      meter_options: [
        {
          value: "jtx",
          label: "jtx"
        },
        {
          value: "futaba",
          label: "futaba"
        },
        {
          value: "okabe",
          label: "okabe"
        },
        {
          value: "nishibe",
          label: "nishibe"
        },
        {
          value: "yazaki24",
          label: "yazaki24"
        },
        {
          value: "yazaki27",
          label: "yazaki27"
        }
      ]
    };
  },
  async asyncData({ store }) {
    await store.dispatch("term_manager/getTermInfo", { id: `12345678` });
  },
  // created: {},
  computed: {
    get_model() {
      this.edit_model = lodash.cloneDeep(this.model);
      return this.edit_model;
    },
    ...mapGetters("term_manager", ["model"])
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },

    /**
     * 端末管理情報更新
     */
    async publish() {
      this.socket.emit("term_manage_page_POST_MESSAGE", {
        name: "test_name",
        message: "test_message"
      });
      console.log("PAGE emit");
      var updateUrl =
        "http://localhost:8330/termmng/v1/driver_term/settings/123456789";

      const updateTermData = {
        model: this.edit_model
      };
      await this.updateTermInfo({
        updateUrl: updateUrl,
        updateTermData: updateTermData
      });
      this.$notify({
        type: "success",
        title: "端末管理登録完了",
        message: `車両ID ${this.edit_model.car_id} として登録しました`,
        // position: "top-right",
        position: `top-center`,
        duration: 3000
      });
    },
    ...mapActions("term_manager", ["updateTermInfo"])
  },
  mounted() {
    // Server APIから通知
    this.socket.on("receive_term_manage_page_MESSAGE", data => {
      console.log("receive_term_manage_page socket.on");
      this.messages = [...this.messages, data];
      console.log("messages.length=" + this.messages.length);
      this.messages.forEach(function(msg, index) {
        console.log("msg" + index + "=" + msg.company_id);
      });

      if (this.messages.length > 0) {
        const jsonString = JSON.stringify(this.messages);
        console.log("receive_term_manage_page_MESSAGE JSON=" + jsonString);
      }
    });
  }
};
</script>

<style>
.task-input {
  margin: 8px 16px 8px 8px;
  width: 200px;
}

.task-input-label {
  display: inline-block;
  width: 160px;
}
.task-input-label2 {
  display: inline-block;
  width: 200px;
}
.posts-page .el-table__row {
  cursor: pointer;
}
.demo-input-label {
  display: inline-block;
  width: 130px;
}
.container {
  margin: 16px;
}
ul {
  margin: 16px 0;
}
</style>
