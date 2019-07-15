export const state = () => ({
  model: {}
});

export const getters = {
  model: state => state.model
};

export const mutations = {
  updateModel(state, { model }) {
    state.model = model;
  },
  clearModel(state) {
    state.model = {};
  }
};

export const actions = {
  /**
   * Server端末情報更新
   */
  async updateTermInfo({ commit }, { updateUrl, updateTermData }) {
    console.log("updateUrl=" + updateUrl);
    console.log("updateTermData");
    console.log(JSON.stringify(updateTermData, undefined, 4));
    const options = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    // var update = {};
    // update.model = updateTermData;
    const top = await this.$axios.$put(updateUrl, updateTermData, options);
    const model = updateTermData.model;
    commit("updateModel", { model });
  },
  /**
   * Serverから端末情報取得
   */
  async getTermInfo({ commit }, { id }) {
    console.log("get Url ID=" + id);
    const url = `http://localhost:8330/termmng/v1/driver_term/settings/${id}`;
    console.log("get Url=" + url);
    const response = await this.$axios.$get(url);
    const model = response.model;
    commit("updateModel", { model });
    console.log(JSON.stringify(model, undefined, 4));
  }
};
