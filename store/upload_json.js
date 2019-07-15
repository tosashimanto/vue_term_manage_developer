export const state = () => ({
  posts: []
});

export const getters = {
  posts: state => state.posts
};

export const mutations = {
  addPost(state, { post }) {
    state.posts.push(post);
  },

  addTarget(state, { post }) {
    state.posts.push(post);
  },

  updatePost(state, { post }) {
    state.posts = state.posts.map(p => (p.id === post.id ? post : p));
  },
  clearPosts(state) {
    state.posts = [];
  }
};

export const actions = {
  /**
   * JSONファイル解析
   *
   * @param uploadUrl
   * @param imageFile
   * @returns {Promise<*>}
   */
  async uploadJSON({ commit }, { uploadUrl, imageFile }) {
    const options = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const apks = await this.$axios.$put(uploadUrl, imageFile.raw, options);
    commit("clearPosts");
    // console.log("apks==============================================");
    // console.log(JSON.stringify(apks, undefined, 4));
    // console.log("apks length=" + apks.length);
    apks.sort(function(a, b) {
      if (a.versionName < b.versionName) return 1;
      if (a.versionName > b.versionName) return -1;
      return 0;
    });

    apks.forEach(function(apk, index) {
      console.log("apk" + index + "=" + apk.apk);
      console.log("versionName" + index + "=" + apk.versionName);

      apk.target.sort(function(a, b) {
        if (a.companyId < b.companyId) return -1;
        if (a.companyId > b.companyId) return 1;
        return 0;
      });

      if (apk.target.length == 0) {
        commit("addPost", {
          post: {
            index1: index,
            index2: 0,
            apk: apk.apk,
            versionName: apk.versionName,
            targetNum: apk.target.length,
            companyId: ``,
            carIdNum: ``,
            carIds: ``
          }
        });
      }
      apk.target.forEach(function(target, index2) {
        // console.log("companyId=" + index2 + "=" + target.companyId)
        // console.log("carIds.length" + index2 + "=" + target.carIds.length)
        var carIDArray = [];
        target.carIds.forEach(function(carId, index3) {
          carIDArray.push(carId);
        });
        carIDArray.sort();
        var carIdNum = 0;
        if (target.carIds) {
          carIdNum = target.carIds.length;
        }
        commit("addPost", {
          post: {
            index1: index,
            index2: index2,
            apk: apk.apk,
            versionName: apk.versionName,
            targetNum: apk.target.length,
            companyId: target.companyId,
            carIdNum: carIdNum,
            carIds: carIDArray.join(", ")
          }
        });
      });
    });

    const jsonString = JSON.stringify(state.posts);
    console.log("jsonString=" + jsonString);
    console.log("state.posts=" + state.posts);
  }
};
