export const state = () => ({
    posts: [
    ]
  })
  
  export const getters = {
    posts: state => state.posts
  }
  
  export const mutations = {
    addPost(state, { post }) {
      state.posts.push(post)
    },
  
    addTarget(state, { post }) {
      state.posts.push(post)
    },
  
    updatePost(state, { post }) {
      state.posts = state.posts.map(p => (p.id === post.id ? post : p))
    },
    clearPosts(state) {
      state.posts = []
    }
  }
  
  
  export const actions = {
  
      async hello() {
        alert("hello")
        const post = await this.$axios.$get(`/hello`)
    
      },
      async register({ commit }, { id }) {
        alert("register")
        // const payload = {}
        // payload[id] = { id }
        // await this.$axios.$patch(`/users.json`, payload)
        // const user = await this.$axios.$get(`/users/${id}.json`)
        // if (!user.id) throw new Error('Invalid user')
      },
      /**
       * S3画像アップロード
       * @param uploadUrl
       * @param imageFile
       * @returns {Promise<*>}
       */
      async uploadImage({commit}, {uploadUrl, imageFile}) {
        const options = {
          headers: {
            'Content-Type': 'application/json'
            // 'content-type': 'text/json'
          }
        };
        // return axios.put(uploadUrl, imageFile, options);
        console.log("test001")
        const top = await this.$axios.$put(uploadUrl, imageFile.raw, options)
        
        commit('clearPosts')
  
        console.log("test002")
        console.log("top=" + top)
        const apks = top.root
  
        console.log("apks=" + apks)
        console.log("apks length=" + apks.length)
        apks.sort(function(a, b){
          if(a.versionName < b.versionName) return 1;
          if(a.versionName > b.versionName) return -1;
          return 0;
        });
  
        apks.forEach( function( apk, index ) {
            // console.log("apk" + index + "=" + apk.apk)
            // console.log("versionName" + index + "=" + apk.versionName)
  
            apk.target.sort(function(a, b){
              if(a.companyId < b.companyId) return -1;
              if(a.companyId > b.companyId) return 1;
              return 0;
            });
  
            apk.target.forEach( function( target, index2 ) {
              // console.log("companyId=" + index2 + "=" + target.companyId)
              // console.log("carIds.length" + index2 + "=" + target.carIds.length)
  
  
              var carIDArray = []
              target.carIds.forEach( function( carId, index3 ) {
                carIDArray.push(carId)
              })
              carIDArray.sort()
  
              commit('addPost', {
                post: {
                  index1 : index,
                  index2 : index2,
                  apk: apk.apk,
                  versionName: apk.versionName,
                  targetNum: apk.target.length,
                  companyId: target.companyId,
                  carIdNum: target.carIds.length,
                  carIds: carIDArray.join(", ")
                }
              })
            })
  
        });
  
        // state.posts.push(t.tableData[0])
        const jsonString = JSON.stringify(state.posts)
        console.log("jsonString=" + jsonString);
        console.log("state.posts=" + state.posts)
  
      },
  
    };
  
  //   var sort_by = function(field, reverse, primer){
  //     reverse = (reverse) ? -1 : 1;
  //     return function(a,b){
  //         a = a[field];
  //         b = b[field];
  //         if (typeof(primer) != 'undefined'){
  //             a = primer(a);
  //             b = primer(b);
  //         }
  //         if (a<b) return reverse * -1;
  //         if (a>b) return reverse * 1;
  //         return 0;
  //     }
  //  }