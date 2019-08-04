export const state = () => ({
    messages: []
  });
  
  export const getters = {
    model: state => state.messages
  };
  
  export const mutations = {
    updateModel(state, { messages }) {
      state.messages = messages;
    },
    clearModel(state) {
      state.messages = [];
    }
  };
  
  export const actions = {
    /**
     * logファイル保存
     */
    async updateLogInfo({ commit }, { updateUrl, logData }) {
      console.log("updateUrl=" + updateUrl);
      console.log("logData");
      console.log(JSON.stringify(logData, undefined, 4));
      const options = {
        headers: {
          "Content-Type": "application/json"
        }
      };
 
      const top = await this.$axios.$put(updateUrl, logData, options);
      const messages = logData.messages;
      // commit("updateModel", { messages });
      commit("clearModel");
    },

  };
  