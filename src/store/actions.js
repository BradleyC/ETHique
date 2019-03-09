import Web3 from 'web3'
import firebase from 'firebase'

const getAbiDeployedAddress = abi => {
  if (!abi) return ''
  const networks = abi.networks
  return networks[Math.max(...Object.keys(networks))].address
}

export default {
  // Connect to a known web3 provider
  // https://gist.github.com/bitpshr/076b164843f0414077164fe7fe3278d9#file-provider-enable-js
  async connect({ commit, state, dispatch }) {
    dispatch('initFirebase')
    let web3Provider = false
    if (typeof window.web3 !== 'undefined') {
      web3Provider = window.web3.currentProvider
      try {
        // Not quite ready yet
        if (web3Provider.enable) await web3Provider.enable()
        // console.log('web3Provider', web3Provider)
        commit('SET_METAMASK', true)
      } catch (e) {
        console.log('e', e)
        commit('SET_METAMASK', false)
      }
    } else if (!state.retried) {
      commit('SET_RETRY', true)
      setTimeout(() => {
        dispatch('connect')
      }, 1000)
    }
    if (state.retried && !web3Provider) {
      web3Provider = new Web3(
        window.web3.givenProvider || `ws://${process.env.RPC_PROVIDER}`
      )
    }
    if (web3Provider) {
      window.web3 = new Web3(web3Provider)
      commit('SET_CONNECTED', true)
      dispatch('setAccountInterval')
      dispatch('mountContract')
    }
  },

  setAccountInterval({ dispatch }) {
    dispatch('checkAccount')
    setInterval(() => {
      dispatch('checkAccount')
    }, 3000)
  },

  checkAccount({ commit, state }) {
    window.web3.eth.getAccounts((error, accounts) => {
      if (error) console.error(error)
      if (state.account !== accounts[0]) {
        commit('USE_ACCOUNT', accounts[0])
      } else if (!accounts.length) {
        commit('USE_ACCOUNT', null)
      }
    })
  },

  mountContract({ dispatch, commit, state }) {
    if (state.connected) {
      commit('CLEAR_CONTRACT')

      const address = getAbiDeployedAddress(state.abi)
      const contract = new window.web3.eth.Contract(state.abi.abi, address)
      commit('USE_CONTRACT', contract)
    } else {
      setTimeout(() => {
        dispatch('mountContract')
      }, 500)
    }
  },

  initFirebase({ commit }) {
    // Initialize Firebase
    var config = {
      apiKey: 'AIzaSyBzhMRRg-EGNSXEr5l6CWy25NwQuE3F-D8',
      authDomain: 'ethique-7ac33.firebaseapp.com',
      databaseURL: 'https://ethique-7ac33.firebaseio.com',
      projectId: 'ethique-7ac33',
      storageBucket: 'ethique-7ac33.appspot.com',
      messagingSenderId: '333113931320'
    }
    firebase.initializeApp(config)
    var provider = new firebase.auth.TwitterAuthProvider()
    commit('SET_PROVIDER', provider)
  },
  handleLogin({ commit, state }) {
    if (!state.provider) console.log('hello')
    if (!state.provider) return
    console.log(state.provider)
    firebase
      .auth()
      .signInWithPopup(state.provider)
      .then(function(result) {
        console.log(result)
        // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
        // You can use these server side with your app's credentials to access the Twitter API.
        // var token = result.credential.accessToken
        // var secret = result.credential.secret
        // The signed-in user info.
        // var user = result.user
        // ...
        commit('SET_TOKEN', result.credential.accessToken)
        commit('SET_USER', { username: result.additionalUserInfo.username })
      })
      .catch(function(error) {
        console.log(error)
        // Handle Errors here.
        // var errorCode = error.code
        // var errorMessage = error.message
        // The email of the user's account used.
        // var email = error.email
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential
        // ...
      })
  }
}
