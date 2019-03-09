import axios from 'axios'

const apiBase = 'https://api.twitter.com/1.1/'

export default {
  getters: {
    // profile: state => state.profile,
    // idToken: state => state.idToken
  },
  mutations: {
    // SET_PROFILE: setProfile,
    // SET_TOKEN: setIdToken
  },
  state: {
    // idToken: '',
    // profile: {}
  },
  actions: {
    getPosts: getPosts
  }
}
/**
 * TODO: client request is not accepted by twitter API. Switch to serverside
 * Starting with this endpoint. Returns most recent tweets for user and followed:
 * https://api.twitter.com/1.1/statuses/home_timeline.json
 * relevant params: count, since_id, exclude_replies
 */
async function getPosts({ rootState }) {
  while (!rootState.accessToken) {
    console.log('waiting for twitter auth')
    await waitFor()
  }
  console.log(rootState.accessToken)
  var params = {
    method: 'GET',
    url: apiBase + 'statuses/home_timeline.json',
    params: {
      count: 20
    },
    header: {
      authorization: 'Bearer ' + rootState.accessToken
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
    console.log(resolve)
  })
}

// function requestToken() {
//   var params = {
//     method: 'POST',
//     url: 'https://api.twitter.com/oauth/request_token',
//     params: {
//       oauth_consumer_key: process.env.TWITTER,
//       oauth_callback: 'http://localhost:4000'
//     }
//   }
//   return new Promise(async (resolve, reject) => {
//     var tokenErr
//     var response = await axios(params).catch(error => {
//       console.log(error)
//       tokenErr = true
//       reject(error)
//     })
//     if (tokenErr) return
//     console.log(response)
//   })
// }
// }
function waitFor() {
  return new Promise(resolve => setTimeout(resolve, 200))
}
