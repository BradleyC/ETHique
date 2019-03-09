// import axios from 'axios'

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
    // handleLogin: handleLogin
  }
}

function requestToken() {
  var params = {
    method: 'POST',
    url: 'https://api.twitter.com/oauth/request_token',
    params: {
      oauth_consumer_key: process.env.TWITTER,
      oauth_callback: 'http://localhost:4000'
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
  })
}
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
