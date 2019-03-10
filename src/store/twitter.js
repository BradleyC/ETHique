import axios from 'axios'

export default {
  getters: {
    statusFeed: state => state.statusFeed
  },
  mutations: {
    UPDATE_FEED: updateFeed,
    UPDATE_FEED_W_LIKE: updateFeedwLike
  },
  state: {
    statusFeed: []
  },
  actions: {
    getPosts: getPosts,
    likeStatus: likeStatus
  }
}
/**
 * library seeems to return object like:
 * home_timeline or user_timeline return somethig like this:
 * response.data: [ list tweet objects ]
 *
 * if using 'search/tweets', { q: 'ethereum since:2019-03-01', count: 20 }
 * Data looks like:
 * response.data: {
 *   search_metadata: {
 *     completed_in: 0.041
 *     count: 20
 *     max_id: 1104382389579640800
 *     max_id_str: "1104382389579640837"
 *     next_results: "?max_id=1104381926280851466&q=ethereum%20since%3A2019-03-01&count=20&include_entities=1"
 *     query: "ethereum+since%3A2019-03-01"
 *     refresh_url: "?since_id=1104382389579640837&q=ethereum%20since%3A2019-03-01&include_entities=1"
 *     since_id: 0
 *     since_id_str: "0"
 *   }
 *   statuses: [ list tweet objects ]
 * }
 * Tweet Keys of interest:
 * text
 * user.screen_name
 * favorited
 */
async function getPosts({ commit, rootState }) {
  while (!rootState.accessToken.token) {
    console.log('waiting for twitter auth')
    await waitFor()
  }
  var params = {
    method: 'GET',
    url: process.env.SERVER + '/tweets',
    headers: {
      oauth_token: rootState.accessToken.token,
      oauth_consumer_key: rootState.accessToken.key
    }
  }
  return new Promise(async (resolve, reject) => {
    var tokenErr
    var response = await axios(params).catch(error => {
      console.log(error)
      tokenErr = true
      reject(error)
    })
    if (tokenErr) return

    console.log(response)
    commit('UPDATE_FEED', response.data)
    resolve(true)
  })
}

function updateFeed(state, data) {
  state.statusFeed = data
}
function updateFeedwLike(state, data) {
  for (var i = 0; i < state.statusFeed.length; i++) {
    if (state.statusFeed[i].id_str === data.id_str) {
      state.statusFeed[i].favorited = true
      break
    }
  }
}

async function likeStatus({ commit, dispatch, rootState }, statusObj) {
  console.log(statusObj)
  await dispatch('interactTransaction', statusObj.user.screen_name)

  if (dispatch) return
  var params = {
    method: 'POST',
    url: process.env.SERVER + '/tweets',
    headers: {
      oauth_token: rootState.accessToken.token,
      oauth_consumer_key: rootState.accessToken.key
    },
    params: {
      action: 'favorite'
    }
  }
  if (statusObj.retweeted) {
    params.params.statusId = statusObj.retweeted_status.id_str
  } else {
    params.params.statusId = statusObj.id_str
  }
  console.log(params)
  return new Promise(async (resolve, reject) => {
    var tokenErr
    var response = await axios(params).catch(error => {
      console.log(error)
      tokenErr = true
      reject(error)
    })
    if (tokenErr) return

    console.log(response)
    commit('UPDATE_FEED_W_LIKE', response.data)
    resolve(true)
  })
}

function waitFor() {
  return new Promise(resolve => setTimeout(resolve, 200))
}
